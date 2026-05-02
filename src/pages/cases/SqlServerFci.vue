<template>
  <div class="paper-layout">

    <paper-side-nav :sections="sections" />

    <div class="paper-container">
      <div class="paper-header">
        <router-link to="/case-studies" class="back-link">&#8592; back to case studies</router-link>
        <div class="paper-meta">
          <span class="paper-tag">SQL Server 2022</span>
          <span class="paper-tag">High Availability</span>
          <span class="paper-tag">Hyper-V</span>
          <span class="paper-tag">Windows Server 2022</span>
        </div>
        <h1>SQL Server 2022 Failover Cluster Instance &mdash; Dual-Layer HA Homelab</h1>
        <p class="paper-subtitle">
          Database Management &mdash; Homelab Implementation &mdash; 2025
        </p>
      </div>

      <article class="paper-body">

        <section id="overview">
          <h2>01. Overview</h2>
          <div class="meta-grid">
            <div class="meta-item"><span class="meta-label">Platform</span><span class="meta-value">Hyper-V on Windows Server 2022</span></div>
            <div class="meta-item"><span class="meta-label">Goal</span><span class="meta-value">Implement SQL Server 2022 FCI with dual-layer high availability</span></div>
            <div class="meta-item"><span class="meta-label">Storage</span><span class="meta-value">iSCSI shared disk via Windows Server iSCSI Target</span></div>
            <div class="meta-item"><span class="meta-label">Clustering</span><span class="meta-value">Windows Server Failover Clustering (WSFC)</span></div>
            <div class="meta-item"><span class="meta-label">RPO</span><span class="meta-value">Zero &mdash; synchronous shared storage</span></div>
            <div class="meta-item"><span class="meta-label">RTO</span><span class="meta-value">~30 seconds &mdash; automatic SQL resource failover</span></div>
            <div class="meta-item"><span class="meta-label">Outcome</span><span class="meta-value">FCI validated &mdash; automatic failover confirmed across both layers</span></div>
          </div>
          <p>
            This project builds a dual-layer high availability architecture for SQL Server 2022 entirely
            inside a Hyper-V homelab. Layer 1 is Hyper-V's own VM failover and live migration &mdash; a node
            running a cluster VM can fail and the VM moves to another host automatically. Layer 2 is a SQL
            Server Failover Cluster Instance sitting on top, where the SQL resource group moves between two
            Windows Server VMs without dropping the connection endpoint. Together they protect the database
            from both physical host failure and OS-level SQL instance failure independently.
          </p>
          <p>
            The starting point was a database already running in Azure SQL. The goal was to migrate it into
            an on-premises FCI, prove the architecture holds under failure conditions, and document the full
            process &mdash; including the parts that did not go smoothly on the first attempt.
          </p>
        </section>

        <section id="architecture">
          <h2>02. Architecture</h2>
          <h3>Dual-Layer Design</h3>
          <p>
            The architecture stacks two independent failover mechanisms. Each operates at a different layer
            of the infrastructure and protects against different failure types.
          </p>

          <img src="@/assets/images/SqlFci/dual-layer-ha.png" alt="Dual-layer HA architecture diagram" class="arch-image" @click="openLightbox" />
          <span class="image-caption">Fig. 1 &mdash; Dual-layer HA: Hyper-V VM failover (Layer 1) + SQL Server FCI (Layer 2)</span>

          <div class="table-wrapper">
            <table>
              <thead><tr><th>Layer</th><th>Technology</th><th>Protects Against</th><th>Recovery</th></tr></thead>
              <tbody>
                <tr><td>Layer 1</td><td>Hyper-V VM Failover / Live Migration</td><td>Physical host failure</td><td>VM moved to surviving Hyper-V host</td></tr>
                <tr><td>Layer 2</td><td>SQL Server FCI (WSFC)</td><td>OS / SQL instance failure</td><td>SQL resource group moves to passive node</td></tr>
              </tbody>
            </table>
          </div>

          <h3>How SQL Server FCI Works</h3>
          <p>
            An FCI is not replication &mdash; both nodes access the <em>same</em> physical storage. At any
            given time one node owns the SQL Server resource group (active) and the other sits idle
            (passive). The shared disk, SQL Server service, and a Virtual Network Name (VNN) travel together
            as a unit when failover occurs. Clients connect to the VNN and never address either node directly,
            so the connection endpoint does not change during a failover event.
          </p>
          <p>
            Shared storage is provided by an iSCSI target. Both cluster nodes connect to the same iSCSI LUN,
            but only the active node mounts it at any given time. WSFC coordinates exclusive ownership &mdash;
            it brings the disk online for the active owner and keeps it strictly offline on the passive node.
          </p>

          <img src="@/assets/images/SqlFci/lab-topology.png" alt="Full homelab topology diagram" class="arch-image" @click="openLightbox" />
          <span class="image-caption">Fig. 2 &mdash; Full homelab topology: Hyper-V host, SQL nodes, storage server, and networking</span>

          <h3>Quorum</h3>
          <p>
            With two cluster nodes a quorum witness is essential. Without it, if one node loses connectivity
            both nodes believe they are the surviving majority and both attempt to bring resources online &mdash;
            a split-brain scenario that causes data corruption. A file share witness hosted on a third machine
            provides the tiebreaker vote. This lab uses a file share witness on the storage server.
          </p>
        </section>

        <section id="environment">
          <h2>03. Homelab Environment</h2>
          <h3>Virtual Machines</h3>
          <div class="table-wrapper">
            <table>
              <thead><tr><th>VM</th><th>OS</th><th>vCPU</th><th>RAM</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td>SQLNode1</td><td>Windows Server 2022</td><td>4</td><td>8 GB</td><td>SQL FCI &mdash; primary node</td></tr>
                <tr><td>SQLNode2</td><td>Windows Server 2022</td><td>4</td><td>8 GB</td><td>SQL FCI &mdash; secondary node</td></tr>
                <tr><td>StorageSrv</td><td>Windows Server 2022</td><td>2</td><td>4 GB</td><td>iSCSI target &amp; file share witness</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Networking &amp; Virtual Switches</h3>
          <p>
            Each VM has two virtual network adapters: one for management traffic and one dedicated to cluster
            heartbeat communication. Separating these is a WSFC best practice &mdash; cluster heartbeat traffic
            on a dedicated network prevents management congestion from masking node health and prevents
            false-positive failovers.
          </p>
          <div class="code-block">
            <span class="code-label">Hyper-V Host &mdash; Create Virtual Switches (PowerShell)</span>
            <pre><code>New-VMSwitch -Name "Management" -NetAdapterName "Ethernet" -AllowManagementOS $true
New-VMSwitch -Name "ClusterHeartbeat" -SwitchType Internal

# Assign adapters to each SQL node
Add-VMNetworkAdapter -VMName "SQLNode1" -SwitchName "Management"
Add-VMNetworkAdapter -VMName "SQLNode1" -SwitchName "ClusterHeartbeat"
Add-VMNetworkAdapter -VMName "SQLNode2" -SwitchName "Management"
Add-VMNetworkAdapter -VMName "SQLNode2" -SwitchName "ClusterHeartbeat"</code></pre>
          </div>
          <div class="callout callout--insight">
            <span class="callout-label">Single-NIC Constraint</span>
            <p>
              The homelab runs on a single physical NIC, which means management, iSCSI, cluster heartbeat,
              and Hyper-V live migration traffic all share the same physical link. In production this is a
              known anti-pattern &mdash; iSCSI benefits from a dedicated 10GbE NIC and heartbeat should
              be isolated from data traffic. In this lab it works, but it represents a single physical
              point of failure that a production design must address.
            </p>
          </div>
        </section>

        <section id="iscsi">
          <h2>04. iSCSI Shared Storage</h2>
          <h3>Storage Server &mdash; iSCSI Target</h3>
          <p>
            The storage server presents a block device (LUN) to the cluster nodes over the network as if
            it were locally attached disk. Windows Server 2022 includes an iSCSI Target Server role that
            handles this without any third-party software. The virtual disk is a <code>.vhdx</code> file
            on the storage server &mdash; WSFC cluster nodes see it as a raw disk once connected.
          </p>
          <div class="code-block">
            <span class="code-label">StorageSrv &mdash; Install iSCSI Target &amp; Create LUN (PowerShell)</span>
            <pre><code>Install-WindowsFeature FS-iSCSITarget-Server -IncludeManagementTools

# Create the virtual disk that will be the shared cluster disk
New-IscsiVirtualDisk -Path "C:\iSCSI\SQLClusterDisk.vhdx" -Size 50GB

# Create the iSCSI target, allow only the two SQL nodes to connect
New-IscsiServerTarget -TargetName "sql-fci-target" `
    -InitiatorIds "IQN:iqn.1991-05.com.microsoft:sqlnode1",`
                  "IQN:iqn.1991-05.com.microsoft:sqlnode2"

# Map the virtual disk to the target
Add-IscsiVirtualDiskTargetMapping -TargetName "sql-fci-target" `
    -Path "C:\iSCSI\SQLClusterDisk.vhdx"</code></pre>
          </div>
          <h3>SQL Nodes &mdash; iSCSI Initiator</h3>
          <p>
            Both SQL nodes connect to the same target. The key point is that both must see the same disk
            before the cluster is formed &mdash; WSFC handles exclusive ownership at the cluster level after
            that. The iSCSI initiator service needs to be running and set to auto-start on both nodes.
          </p>
          <div class="code-block">
            <span class="code-label">SQLNode1 &amp; SQLNode2 &mdash; Connect iSCSI Initiator (PowerShell)</span>
            <pre><code>Start-Service MSiSCSI
Set-Service MSiSCSI -StartupType Automatic

# Discover the target portal (StorageSrv IP on the iSCSI network)
New-IscsiTargetPortal -TargetPortalAddress "10.10.0.10"

# Connect persistently so the connection survives reboots
Connect-IscsiTarget `
    -NodeAddress "iqn.1991-05.com.microsoft:storagesrv-sql-fci-target" `
    -IsPersistent $true

# Verify session is connected
Get-IscsiSession | Select-Object IsConnected, TargetNodeAddress</code></pre>
          </div>
          <p>
            Once both nodes are connected, the LUN appears in Disk Management on both. Before forming the
            cluster, the disk needs to be initialised and formatted on <strong>one node only</strong> &mdash;
            WSFC takes exclusive control of it once the cluster is created.
          </p>
          <div class="callout callout--warn">
            <span class="callout-label">Do Not Format on Both Nodes</span>
            <p>
              Initialising and formatting the shared disk simultaneously on both nodes will corrupt it.
              Bring the disk online and format it on SQLNode1 only. SQLNode2 must see the disk in Disk
              Management but leave it offline until WSFC owns it.
            </p>
          </div>
        </section>

        <section id="wsfc">
          <h2>05. Windows Server Failover Clustering</h2>
          <h3>Install Failover Clustering Feature</h3>
          <div class="code-block">
            <span class="code-label">SQLNode1 &amp; SQLNode2 &mdash; Install Feature (PowerShell)</span>
            <pre><code>Install-WindowsFeature Failover-Clustering -IncludeManagementTools
Install-WindowsFeature RSAT-Clustering-PowerShell

Restart-Computer -Force</code></pre>
          </div>
          <h3>Cluster Validation</h3>
          <p>
            Before creating the cluster, WSFC requires a validation run across all candidate nodes. This
            tests storage access, networking, and system configuration and flags anything that would prevent
            the cluster from functioning. Skipping this step is not an option for a supported configuration
            &mdash; Microsoft will not provide support for a cluster that bypassed validation.
          </p>
          <div class="code-block">
            <span class="code-label">SQLNode1 &mdash; Run Cluster Validation (PowerShell)</span>
            <pre><code>Test-Cluster -Node "SQLNode1","SQLNode2" `
    -Include "Storage","Network","System Configuration" `
    -ReportName "C:\ClusterValidation\report"</code></pre>
          </div>

          <img src="@/assets/images/SqlFci/cluster-validation.png" alt="Cluster validation report" class="arch-image" @click="openLightbox" />
          <span class="image-caption">Cluster validation report &mdash; all storage and network tests passed</span>

          <h3>Create the Cluster</h3>
          <div class="code-block">
            <span class="code-label">SQLNode1 &mdash; Create Failover Cluster (PowerShell)</span>
            <pre><code># Cluster name and IP must be unique in DNS / Active Directory
New-Cluster -Name "SQLCLUSTER" `
    -Node "SQLNode1","SQLNode2" `
    -StaticAddress "192.168.1.50" `
    -NoStorage

# Add the shared iSCSI disk to the cluster
Get-ClusterAvailableDisk | Add-ClusterDisk</code></pre>
          </div>
          <h3>Quorum &mdash; File Share Witness</h3>
          <p>
            With two nodes the cluster has an even vote count. A file share witness on the storage server
            gives the cluster a tiebreaker vote, preventing split-brain if the inter-node link goes down.
            The cluster computer account needs full control of the share.
          </p>
          <div class="code-block">
            <span class="code-label">SQLNode1 &mdash; Configure File Share Witness (PowerShell)</span>
            <pre><code># Create the share on StorageSrv first, grant SQLCLUSTER$ full control
Set-ClusterQuorum -Cluster "SQLCLUSTER" `
    -FileShareWitness "\\StorageSrv\SQLClusterWitness"

Get-ClusterQuorum</code></pre>
          </div>
        </section>

        <section id="fci-install">
          <h2>06. SQL Server FCI Installation</h2>
          <h3>Node 1 &mdash; Create the FCI</h3>
          <p>
            The FCI installation runs from SQL Server 2022 setup with the
            <code>InstallFailoverCluster</code> action. This creates the SQL resource group inside WSFC,
            claims the shared disk, and registers the Virtual Network Name in DNS. The VNN is the name
            clients will use to connect &mdash; it stays stable across failovers.
          </p>
          <div class="code-block">
            <span class="code-label">SQLNode1 &mdash; Install SQL Server 2022 FCI (setup.exe)</span>
            <pre><code>setup.exe /ACTION=InstallFailoverCluster `
    /FEATURES=SQLENGINE `
    /INSTANCENAME="MSSQLSERVER" `
    /SQLSVCACCOUNT="DOMAIN\sqlservice" `
    /SQLSVCPASSWORD="P@ssw0rd!" `
    /AGTSVCACCOUNT="DOMAIN\sqlservice" `
    /INSTALLSQLDATADIR="S:\SQLData" `
    /FAILOVERCLUSTERNETWORKNAME="SQLFCI" `
    /FAILOVERCLUSTERIPADDRESSES="IPv4;192.168.1.60;Management;255.255.255.0" `
    /FAILOVERCLUSTERDISKS="Cluster Disk 1" `
    /IACCEPTSQLSERVERLICENSETERMS</code></pre>
          </div>
          <p>
            The <code>FAILOVERCLUSTERDISKS</code> value must exactly match the disk name as it appears in
            Failover Cluster Manager &mdash; a mismatch here causes a silent failure during setup that is
            difficult to diagnose. Verify the exact name with
            <code>Get-ClusterResource | Where-Object ResourceType -eq "Physical Disk"</code> first.
          </p>
          <h3>Node 2 &mdash; Add to the Existing FCI</h3>
          <div class="code-block">
            <span class="code-label">SQLNode2 &mdash; Add Node to FCI (setup.exe)</span>
            <pre><code>setup.exe /ACTION=AddNode `
    /INSTANCENAME="MSSQLSERVER" `
    /FAILOVERCLUSTERNETWORKNAME="SQLFCI" `
    /SQLSVCACCOUNT="DOMAIN\sqlservice" `
    /SQLSVCPASSWORD="P@ssw0rd!" `
    /AGTSVCACCOUNT="DOMAIN\sqlservice" `
    /IACCEPTSQLSERVERLICENSETERMS</code></pre>
          </div>

          <img src="@/assets/images/SqlFci/cluster-manager.png" alt="Failover Cluster Manager showing SQL Server FCI" class="arch-image" @click="openLightbox" />
          <span class="image-caption">Failover Cluster Manager &mdash; SQL Server resource group active on SQLNode1, SQLNode2 passive</span>

          <h3>Database Migration from Azure SQL</h3>
          <p>
            The existing database in Azure SQL was migrated to the on-premises FCI using a
            <code>.bacpac</code> export. Azure SQL's export function produces a logical backup containing
            the full schema and data. This was imported into the FCI instance using SQL Server Management
            Studio, then the database files were moved to the shared cluster disk so they become part
            of the SQL resource group.
          </p>
          <div class="callout callout--insight">
            <span class="callout-label">bacpac vs. Native Backup</span>
            <p>
              Azure SQL exports produce a <code>.bacpac</code> (schema + data, no transaction log history).
              A native <code>.bak</code> backup preserves transaction log history and allows point-in-time
              restore. For a lab migration either works. In production, use log shipping or Azure Database
              Migration Service to minimise the cutover window.
            </p>
          </div>
        </section>

        <section id="testing">
          <h2>07. Failover Testing</h2>
          <h3>Test 1 &mdash; Planned Failover</h3>
          <p>
            A planned failover moves the SQL resource group cleanly from the active node to the passive
            node. All in-flight transactions are committed first, the disk is taken offline on the current
            owner, resources come online on the target node, and clients reconnect via the VNN
            automatically. The connection interruption for clients was approximately 8 seconds.
          </p>
          <div class="code-block">
            <span class="code-label">PowerShell &mdash; Planned Failover</span>
            <pre><code># Check current owner before failover
Get-ClusterGroup -Name "SQL Server (MSSQLSERVER)" | Select-Object Name, OwnerNode, State

# Move the SQL resource group to Node2
Move-ClusterGroup -Name "SQL Server (MSSQLSERVER)" -Node "SQLNode2"

# Verify new owner after move
Get-ClusterGroup -Name "SQL Server (MSSQLSERVER)" | Select-Object Name, OwnerNode, State</code></pre>
          </div>
          <h3>Test 2 &mdash; Unplanned Failover</h3>
          <p>
            The unplanned test simulates a hard node crash &mdash; SQLNode1 was forcibly shut down from
            Hyper-V Manager without an OS shutdown. WSFC detected the loss of heartbeat within the
            configured failure threshold and brought the SQL resource group online on SQLNode2
            automatically. Total outage from shutdown to SQL available on Node2: approximately 28 seconds.
          </p>
          <h3>Test 3 &mdash; Layer 1 Hyper-V Live Migration</h3>
          <p>
            With the FCI active on SQLNode2, a Hyper-V live migration was performed &mdash; the SQLNode2
            VM was moved from one Hyper-V host to another while SQL was running and the FCI was active.
            SQL remained available throughout with zero connection interruption. This validates the
            dual-layer design: the FCI layer and the Hyper-V layer operate independently and
            simultaneously without interfering.
          </p>

          <img src="@/assets/images/SqlFci/failover-proof.png" alt="Failover Cluster Manager post-failover" class="arch-image" @click="openLightbox" />
          <span class="image-caption">Post-failover state &mdash; SQL Server resource group now owned by SQLNode2, SQLNode1 passive</span>

          <div class="table-wrapper">
            <table>
              <thead><tr><th>Test</th><th>Method</th><th>Outage Window</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>Planned failover</td><td>Move-ClusterGroup</td><td>~8 seconds</td><td class="result-pass">Pass</td></tr>
                <tr><td>Unplanned failover</td><td>Force shutdown SQLNode1</td><td>~28 seconds</td><td class="result-pass">Pass</td></tr>
                <tr><td>Hyper-V live migration</td><td>VM live migrate with FCI active</td><td>0 seconds</td><td class="result-pass">Pass</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="lessons">
          <h2>08. Issues &amp; Observations</h2>
          <h3>What Worked Well</h3>
          <ul class="content-list">
            <li>The VNN approach means application connection strings never change during failover &mdash; this is the primary practical advantage over alternatives for legacy applications that cannot handle read-intent routing</li>
            <li>WSFC cluster validation caught two configuration issues before cluster formation: a mismatched NIC binding order and a DNS registration conflict &mdash; both were easy to fix once flagged, but would have been hard to diagnose at runtime</li>
            <li>File share witness quorum worked reliably across all three test scenarios without manual intervention</li>
            <li>The dual-layer design held up correctly: Hyper-V live migration and SQL FCI failover are independent and do not interfere with each other</li>
          </ul>
          <h3>Limitations &amp; What Would Change in Production</h3>
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Issue</th><th>Impact in This Lab</th><th>Production Fix</th></tr></thead>
              <tbody>
                <tr><td>Single physical NIC</td><td>Management, iSCSI, and heartbeat share one link &mdash; link failure takes everything down at once</td><td>Dedicated 10GbE NIC for iSCSI; separate NIC for cluster heartbeat</td></tr>
                <tr><td>iSCSI storage SPOF</td><td>StorageSrv is a single VM &mdash; if it fails, both SQL nodes lose the shared disk and the cluster halts</td><td>Replicated SAN, Windows Storage Spaces Direct (S2D), or cloud witness storage</td></tr>
                <tr><td>No redundant quorum witness</td><td>If StorageSrv is unavailable the file share witness is gone &mdash; on a two-node cluster this risks losing quorum on the next node failure</td><td>Azure Cloud Witness removes the dependency on an on-premises VM entirely</td></tr>
                <tr><td>No readable secondary</td><td>Passive node is completely idle &mdash; no reporting traffic offload</td><td>Always On AG with a synchronous secondary for read scale-out (requires Enterprise)</td></tr>
              </tbody>
            </table>
          </div>
          <h3>FCI vs. HA Alternatives</h3>
          <p>
            SQL Server offers three built-in HA strategies at different complexity and licensing levels.
            FCI was the right choice here for validating the shared-storage cluster mechanics and for
            applications that require a single stable connection name. In production the decision
            depends on RPO requirements, application compatibility, and licensing budget.
          </p>
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Option</th><th>RPO</th><th>RTO</th><th>Readable Secondary</th><th>License</th></tr></thead>
              <tbody>
                <tr><td>FCI</td><td>Zero (shared storage)</td><td>~30s</td><td>No</td><td>Standard or Enterprise</td></tr>
                <tr><td>Always On AG (sync)</td><td>Near-zero</td><td>~20&ndash;30s</td><td>Yes (Enterprise)</td><td>Enterprise</td></tr>
                <tr><td>Azure SQL Managed Instance</td><td>Seconds (geo-replication)</td><td>Minutes (geo-failover)</td><td>Yes</td><td>Per-vCore + Azure cost</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="references">
          <h2>09. References</h2>
          <ul class="resources-list">
            <li>
              <a href="https://learn.microsoft.com/en-us/sql/sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server" target="_blank" rel="noopener">SQL Server FCI &mdash; Microsoft Learn</a>
              <span>Official documentation covering FCI architecture, requirements, installation, and management for SQL Server on Windows Server Failover Clustering.</span>
            </li>
            <li>
              <a href="https://learn.microsoft.com/en-us/windows-server/failover-clustering/create-failover-cluster" target="_blank" rel="noopener">Create a Failover Cluster &mdash; Microsoft Learn</a>
              <span>Step-by-step guide for creating a Windows Server Failover Cluster, including prerequisites, validation, and quorum configuration.</span>
            </li>
            <li>
              <a href="https://learn.microsoft.com/en-us/windows-server/storage/iscsi/iscsi-target-server" target="_blank" rel="noopener">iSCSI Target Server &mdash; Microsoft Learn</a>
              <span>Documentation for the iSCSI Target Server role in Windows Server &mdash; setup, configuration, and best practices for providing shared block storage to cluster nodes.</span>
            </li>
            <li>
              <a href="https://learn.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server" target="_blank" rel="noopener">Always On Availability Groups &mdash; Microsoft Learn</a>
              <span>Overview of Always On AG as an alternative HA strategy, covering differences in RPO, RTO, readable secondaries, and Enterprise licensing requirements versus FCI.</span>
            </li>
            <li>
              <a href="https://learn.microsoft.com/en-us/windows-server/failover-clustering/deploy-cloud-witness" target="_blank" rel="noopener">Deploy a Cloud Witness &mdash; Microsoft Learn</a>
              <span>Guide for using Azure Blob Storage as a quorum witness &mdash; eliminates the on-premises file share witness dependency that is a single point of failure in this lab design.</span>
            </li>
          </ul>
        </section>

      </article>

      <div class="paper-footer">
        <router-link to="/case-studies" class="back-link">&#8592; back to case studies</router-link>
      </div>
    </div>

    <div v-if="lightboxSrc" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox__close" @click="closeLightbox">&times;</button>
      <img :src="lightboxSrc" :alt="lightboxAlt" class="lightbox__img" />
    </div>
  </div>
</template>

<script>
import PaperSideNav from '@/components/ui/PaperSideNav.vue';

export default {
  components: { PaperSideNav },
  data() {
    return {
      lightboxSrc: null,
      lightboxAlt: '',
      sections: [
        { id: 'overview',     number: '01', label: 'Overview' },
        { id: 'architecture', number: '02', label: 'Architecture' },
        { id: 'environment',  number: '03', label: 'Homelab Environment' },
        { id: 'iscsi',        number: '04', label: 'iSCSI Storage' },
        { id: 'wsfc',         number: '05', label: 'WSFC' },
        { id: 'fci-install',  number: '06', label: 'SQL Server FCI' },
        { id: 'testing',      number: '07', label: 'Failover Testing' },
        { id: 'lessons',      number: '08', label: 'Issues & Observations' },
        { id: 'references',   number: '09', label: 'References' }
      ]
    };
  },
  methods: {
    openLightbox(event) {
      this.lightboxSrc = event.target.src;
      this.lightboxAlt = event.target.alt;
    },
    closeLightbox() {
      this.lightboxSrc = null;
    },
    handleKeydown(e) {
      if (e.key === 'Escape') this.closeLightbox();
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
};
</script>

<style lang="scss" scoped>
.paper-layout {
  display: grid;
  grid-template-columns: 22rem 1fr;
  gap: 4rem;
  align-items: start;
  padding-bottom: 8rem;

  @include respond(tab-port) {
    grid-template-columns: 1fr;
  }
}

.paper-container {
  min-width: 0;
  padding-bottom: 4rem;
}

.back-link {
  display: inline-block;
  font-family: $font-secondary;
  font-size: $text-small;
  color: $color-primary-dark;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover { color: #7c4ff5; }
}

.paper-header {
  border-left: 2px solid #7c4ff5;
  padding-left: 2rem;
  margin-bottom: 4rem;

  h1 {
    display: block;
    font-family: $font-primary;
    font-size: $heading-secondary;
    color: $color-primary-light;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
}

.paper-meta {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
}

.paper-tag {
  display: inline-block;
  font-family: $font-secondary;
  font-size: $text-extra-small;
  color: #7c4ff5;
  border: 1px solid #7c4ff5;
  padding: 0.2rem 0.8rem;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.paper-subtitle {
  display: block;
  font-family: $font-secondary;
  font-size: $text-small;
  color: $color-primary-dark;
}

.paper-body {
  section {
    margin-bottom: 6rem;
    scroll-margin-top: 8rem;

    h2 {
      display: block;
      font-family: $font-primary;
      font-size: $heading-secondary;
      color: $color-primary-light;
      font-weight: 700;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid $border-secondary;
    }

    h3 {
      display: block;
      font-family: $font-primary;
      font-size: $text-extra;
      color: #7c4ff5;
      font-weight: 600;
      margin-top: 3rem;
      margin-bottom: 1.2rem;
    }

    p {
      display: block;
      font-family: $font-secondary;
      font-size: $text-primary;
      color: $color-primary-dark;
      line-height: 1.9;
      margin-bottom: 1.6rem;
    }

    code {
      font-family: $font-secondary;
      font-size: $text-extra-small;
      color: #c4b5fd;
      background-color: $background-skill;
      padding: 0.2rem 0.5rem;
      border-radius: 2px;
    }

    em { color: $color-primary-light; font-style: italic; }
    strong { color: $color-primary-light; font-weight: 600; }
  }
}

/* Meta grid */
.meta-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 2.4rem;
  border: 1px solid $border-secondary;
  border-radius: 2px;
  overflow: hidden;
}

.meta-item {
  display: flex;
  align-items: baseline;
  padding: 0.8rem 1.4rem;
  border-bottom: 1px solid $border-secondary;
  gap: 1.6rem;

  &:last-child { border-bottom: none; }
}

.meta-label {
  font-family: $font-secondary;
  font-size: $text-extra-small;
  color: #f0eef5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 12rem;
  flex-shrink: 0;
}

.meta-value {
  font-family: $font-secondary;
  font-size: $text-small;
  color: $color-primary-dark;
  line-height: 1.6;
}

/* Image blocks */
.arch-image {
  display: block;
  width: 100%;
  max-width: 100%;
  border: 1px solid $border-secondary;
  border-radius: 2px;
  margin: 2rem 0 0.8rem;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  min-height: 20rem;
  border: 1px dashed $border-secondary;
  border-radius: 2px;
  margin: 2rem 0 0.8rem;
  background-color: rgba(124, 79, 245, 0.03);

  .image-placeholder__label {
    font-family: $font-secondary;
    font-size: $text-small;
    color: $color-primary-dark;
  }

  .image-placeholder__path {
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: #7c4ff5;
  }
}

.image-caption {
  display: block;
  font-family: $font-secondary;
  font-size: $text-extra-small;
  color: $color-primary-dark;
  text-align: center;
  margin-bottom: 2.4rem;
}

/* Callout */
.callout {
  background-color: rgba(124, 79, 245, 0.08);
  border-left: 3px solid #7c4ff5;
  padding: 1.6rem 2rem;
  margin: 2.4rem 0;

  .callout-label {
    display: block;
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: #7c4ff5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.8rem;
  }

  p { margin-bottom: 0 !important; color: $color-primary-light !important; }

  &--insight {
    background-color: rgba(52, 58, 65, 0.5);
    border-left-color: $border-primary;
    .callout-label { color: $color-primary-dark; }
    p { color: $color-primary-dark !important; }
  }

  &--warn {
    background-color: rgba(230, 160, 40, 0.08);
    border-left-color: #e6a028;
    .callout-label { color: #e6a028; }
    p { color: $color-primary-light !important; }
  }
}

/* Code block */
.code-block {
  background-color: $background-secondary;
  border: 1px solid $border-secondary;
  border-radius: 2px;
  margin: 1.6rem 0 2.4rem;
  overflow: hidden;

  .code-label {
    display: block;
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: $color-primary-dark;
    background-color: $background-skill;
    padding: 0.6rem 1.4rem;
    border-bottom: 1px solid $border-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  pre {
    margin: 0;
    padding: 1.6rem;
    overflow-x: auto;

    code {
      font-family: $font-secondary;
      font-size: $text-small;
      color: #7c4ff5;
      line-height: 1.8;
      white-space: pre;
      background: none;
      padding: 0;
    }
  }
}

/* Content list */
.content-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 1.2rem 0 2rem;

  li {
    display: block;
    font-family: $font-secondary;
    font-size: $text-primary;
    color: $color-primary-dark;
    line-height: 1.8;
    padding: 0.4rem 0 0.4rem 2rem;
    position: relative;

    &::before {
      content: '▸';
      color: #7c4ff5;
      position: absolute;
      left: 0;
    }
  }
}

/* Table */
.table-wrapper {
  overflow-x: auto;
  margin: 1.6rem 0 2.4rem;

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: $font-secondary;
    font-size: $text-small;

    th {
      display: table-cell;
      background-color: $background-skill;
      color: #f0eef5;
      text-align: left;
      padding: 1rem 1.4rem;
      font-weight: 600;
      border-bottom: 1px solid $border-secondary;
      text-transform: uppercase;
      font-size: $text-extra-small;
      letter-spacing: 0.05em;
    }

    td {
      display: table-cell;
      padding: 0.9rem 1.4rem;
      color: $color-primary-dark;
      border-bottom: 1px solid $border-secondary;
      line-height: 1.6;

      code {
        font-family: $font-secondary;
        font-size: $text-extra-small;
        color: #7c4ff5;
        background-color: $background-skill;
        padding: 0.2rem 0.5rem;
        border-radius: 2px;
      }
    }

    tr:last-child td { border-bottom: none; }
  }
}

.result-pass { color: #50c878; }
.result-fail { color: #e06060; }

/* Resources list */
.resources-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 1.6rem 0;

  li {
    display: block;
    padding: 1.4rem 0;
    border-bottom: 1px solid $border-secondary;

    &:last-child { border-bottom: none; }

    a {
      display: inline-block;
      font-family: $font-secondary;
      font-size: $text-primary;
      color: #7c4ff5;
      text-decoration: none;
      margin-bottom: 0.4rem;
      transition: color 0.2s ease;

      &:hover { color: $color-primary-light; }
    }

    span {
      display: block;
      font-family: $font-secondary;
      font-size: $text-small;
      color: $color-primary-dark;
      line-height: 1.7;
    }
  }
}

.paper-footer {
  padding-top: 4rem;
  border-top: 1px solid $border-secondary;
  margin-top: 2rem;
}

/* Lightbox */
.arch-image {
  cursor: zoom-in;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: zoom-out;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border: 1px solid $border-secondary;
  border-radius: 2px;
  cursor: default;
}

.lightbox__close {
  position: fixed;
  top: 2rem;
  right: 2.4rem;
  background: none;
  border: none;
  color: $color-primary-dark;
  font-size: 3.2rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: $font-primary;

  &:hover { color: $color-primary-light; }
}
</style>
