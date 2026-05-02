<template>
  <div class="paper-layout">

    <!-- STICKY SIDE NAV -->
    <paper-side-nav :sections="sections" />

    <!-- MAIN CONTENT -->
    <div class="paper-container">
      <div class="paper-header">
        <router-link to="/security" class="back-link">&#8592; back to security</router-link>
        <div class="paper-meta">
          <span class="paper-tag">Cybersecurity</span>
          <span class="paper-tag">Zero Trust</span>
          <span class="paper-tag">Identity & Access</span>
        </div>
        <h1>Implementation of a Least Privilege Model in a Simulated SME Environment</h1>
        <p class="paper-subtitle">
          Atlantic Technological University Mayo &mdash; Cybersecurity Practical Project &mdash; April 2026
        </p>
      </div>

      <article class="paper-body">

        <!-- OVERVIEW -->
        <section id="overview">
          <h2>01. Overview</h2>
          <p>
            Small and medium enterprises are increasingly targeted by cyberattacks that exploit excessive
            user and administrative privileges. While Zero Trust Architecture (ZTA) has emerged as an
            effective security model to address these risks, its full implementation often requires
            resources, expertise, and organisational maturity that exceed the capabilities of many small
            organisations.
          </p>
          <p>
            Least Privilege Access is widely recognised as a foundational element of Zero Trust — ensuring
            that users, devices, and services are granted only the minimum access necessary to perform
            their functions. Poor privilege management, including standing administrative access and
            privilege creep, significantly increases an organisation's attack surface.
          </p>

          <div class="callout">
            <span class="callout-label">Aim</span>
            <p>
              To design, implement, and evaluate a risk-based Least Privilege Access model as a
              foundational control within the context of Zero Trust Architecture for a small enterprise
              environment — demonstrating that meaningful security improvements are achievable without
              full architectural transformation.
            </p>
          </div>

          <h3>Project Objectives</h3>
          <ul class="content-list">
            <li>Examine Least Privilege Access as a foundational Zero Trust control</li>
            <li>Identify risks arising from excessive privileges in SME environments</li>
            <li>Design and implement a risk-based Least Privilege model in a simulated environment</li>
            <li>Evaluate its effectiveness in reducing cybersecurity risk</li>
            <li>Critically reflect on feasibility and limitations for small enterprises</li>
          </ul>

          <h3>Architecture Overview</h3>
          <figure class="arch-figure">
            <img
              src="@/assets/images/hybrid-least-privilege-architecture.png"
              alt="Hybrid Least Privilege Identity Architecture diagram"
              class="arch-image"
            />
            <figcaption class="arch-caption">
              <strong>Fig. 1 — Hybrid Least Privilege Identity Architecture.</strong>
              On-premises Active Directory serves as the authoritative identity source, managing
              Organisational Units, Security Groups, RBAC assignments, and AGDLP file permissions.
              Identities are synchronised to Microsoft Entra ID via hybrid provisioning agents,
              extending governance into the cloud through Administrative Role assignments,
              Privileged Identity Management (PIM) with Just-In-Time privilege elevation, and
              Conditional Access policies enforcing MFA. Both planes converge on the Zero Trust
              principles of Verify Explicitly, Use Least Privilege, Assume Breach, and Monitor &amp; Audit.
            </figcaption>
          </figure>
        </section>

        <!-- LITERATURE REVIEW -->
        <section id="literature">
          <h2>02. Literature Review</h2>
          <p>
            This review examines two key sources: Syed (2025) <em>Zero Trust Principles and the Evolution
            of Privilege Access Management Architectures</em>, and Lund et al. (2024) <em>Zero Trust
            Cybersecurity: Procedures and Considerations in Context</em>.
          </p>

          <h3>Key Findings from the Literature</h3>
          <p>
            Syed (2025) explores how Zero Trust principles have transformed Privileged Access Management
            from static, perimeter-dependent controls to adaptive, identity-centric architectures.
            Traditional security models inadequately address contemporary threats — including credential
            compromise, cloud-based attacks, and insider misuse — due to implicit trust in authenticated
            internal users. The paper highlights innovations such as passwordless authentication,
            just-in-time (JIT) privilege provisioning, and session-based access control as strategies
            to reduce standing privileged access and limit lateral movement.
          </p>
          <p>
            Lund et al. (2024) conceptualise Zero Trust primarily as a set of procedural and governance
            principles rather than a purely technical architecture. Anchored in "never trust, always
            verify," the paper discusses MFA, dynamic authorisation, network segmentation, and the
            adoption of an "assume breach" mindset. The principle of least privilege is emphasised
            through RBAC, contextual access decisions, and segmentation strategies.
          </p>

          <div class="callout callout--insight">
            <span class="callout-label">Synthesis</span>
            <p>
              Both sources confirm that identity is the new security perimeter and least privilege is the
              highest-impact entry point for Zero Trust adoption — deployable in resource-constrained
              environments using existing cloud-native platforms without significant infrastructure cost.
            </p>
          </div>

          <h3>Critical Gaps Identified</h3>
          <p>
            A significant gap in both sources is the lack of explicit guidance for phased implementation
            and evaluation of least-privilege controls in simulated small-enterprise environments.
            Neither work directly addresses the incremental deployment of identity-centric controls
            using cloud-native identity platforms — which is precisely what this project addresses.
          </p>
        </section>

        <!-- LAB ENVIRONMENT -->
        <section id="environment">
          <h2>03. Lab Environment Design</h2>
          <p>
            The implementation deployed a hybrid identity environment within a controlled home laboratory
            using Microsoft Windows Server and Microsoft Entra ID, reflecting the architecture adopted
            by organisations that combine on-premises infrastructure with cloud services.
          </p>

          <h3>Infrastructure Components</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>System</th><th>Role</th></tr>
              </thead>
              <tbody>
                <tr><td>Server 2025 LAB / DC01</td><td>Domain Controller — Active Directory Domain Services</td></tr>
                <tr><td>FS01</td><td>File Server — departmental share hosting</td></tr>
                <tr><td>AADSYNC01</td><td>Identity Synchronisation Server (Entra Provisioning Agent)</td></tr>
                <tr><td>CLIENT01</td><td>Domain Workstation — access validation testing</td></tr>
                <tr><td>Microsoft Entra ID / M365 Tenant</td><td>Cloud identity platform — RBAC, Conditional Access, PIM</td></tr>
              </tbody>
            </table>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/hyper-v.png" alt="Hyper-V Manager showing all four lab VMs running" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 2 — Hyper-V Manager (LK-DSK).</strong> All four lab virtual machines — Server 2025 LAB (DC01), FS01, AADSYNC01, and CLIENT01 — running simultaneously on the host, confirming the full hybrid lab environment was operational during the project.</figcaption>
          </figure>

          <p>
            The hybrid design was deliberately chosen to reflect the reality faced by many SMEs:
            organisations that cannot migrate fully to the cloud but are increasingly consuming cloud
            services such as Microsoft 365 alongside traditional on-premises infrastructure. This mixed
            model introduces identity management complexity that, if unaddressed, creates privilege gaps
            at the boundary between environments.
          </p>

          <h3>Active Directory OU Structure</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Organisational Unit</th><th>Purpose</th></tr>
              </thead>
              <tbody>
                <tr><td>LAB-Users</td><td>Standard user accounts</td></tr>
                <tr><td>LAB-Groups</td><td>Security groups used for RBAC</td></tr>
                <tr><td>LAB-Servers</td><td>Infrastructure servers</td></tr>
                <tr><td>LAB-Workstations</td><td>Client computers</td></tr>
                <tr><td>LAB-ServiceAccounts</td><td>Managed service accounts</td></tr>
              </tbody>
            </table>
          </div>
          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/active-directories.png" alt="Active Directory Users and Computers showing lab OU structure" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 3 — Active Directory OU Structure.</strong> The LAB domain organisational units separating users, groups, servers, workstations, and service accounts — providing the structural foundation for scoped Group Policy and RBAC assignments.</figcaption>
          </figure>
        </section>

        <!-- RBAC -->
        <section id="rbac">
          <h2>04. RBAC & Admin Tiering</h2>
          <p>
            RBAC was implemented to enforce least privilege by assigning permissions to roles rather
            than individual users, reducing administrative complexity and the risk of excessive privilege
            assignment.
          </p>

          <h3>Three-Tier Administrative Model</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Tier</th><th>Scope</th><th>Security Group</th></tr>
              </thead>
              <tbody>
                <tr><td>Tier 0</td><td>Domain Controllers &amp; Identity Infrastructure</td><td><code>GG-T0-DomainAdmins</code></td></tr>
                <tr><td>Tier 1</td><td>Servers &amp; Infrastructure Services</td><td><code>GG-T1-ServerAdmins</code></td></tr>
                <tr><td>Tier 2</td><td>Workstations &amp; User Endpoints</td><td><code>GG-T2-WorkstationAdmins</code></td></tr>
              </tbody>
            </table>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/admin-tier-model.png" alt="Administrative Tier Model diagram" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 4 — Administrative Tier Model.</strong> Tier 0 (Domain Controllers) is restricted to Domain Admins only, with no direct access from Tier 1 or Tier 2. Tier 1 (Servers) is accessible to Domain Admins and Server Admins. Tier 2 (Workstations) is accessible to Domain Admins and Workstation Admins only — preventing credential reuse across tiers.</figcaption>
          </figure>

          <div class="callout callout--insight">
            <span class="callout-label">Security Impact</span>
            <p>
              This tier separation ensures that a compromised workstation administrator account cannot
              be used to access servers or domain controllers — containing the blast radius of
              credential theft. A GPO named <code>Tier2-Deny-Server-Logon</code> enforces this boundary
              via deny logon user rights assignments.
            </p>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/AGDLP.png" alt="Active Directory security groups implementing AGDLP model" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 5 — Security Groups in Active Directory.</strong> Global Groups (GG-) and Domain Local Groups (DL-FS-) created in the LAB-Groups OU to implement the AGDLP permission chain. Each Domain Local Group maps directly to a specific NTFS access level on the corresponding file share.</figcaption>
          </figure>
        </section>

        <!-- HARDENING -->
        <section id="hardening">
          <h2>05. Security Hardening</h2>

          <h3>Workstation Security Baseline</h3>
          <p>
            A Group Policy Object named <code>Workstation-Security-Baseline</code> was linked to the
            LAB-Workstations OU, applying baseline security configurations to protect endpoints against
            credential exposure risks.
          </p>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Policy</th><th>Configuration</th><th>Rationale</th></tr>
              </thead>
              <tbody>
                <tr><td>Enable insecure guest logons</td><td>Disabled</td><td>Prevents unauthenticated SMB access</td></tr>
                <tr><td>LAN Manager authentication level</td><td>NTLMv2 only</td><td>Eliminates weaker legacy auth protocols</td></tr>
                <tr><td>Audit logon events</td><td>Success and Failure</td><td>Visibility for incident detection</td></tr>
              </tbody>
            </table>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/workstation-baseline.png" alt="Workstation Security Baseline GPO settings" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 6 — Workstation Security Baseline GPO.</strong> Group Policy report confirming the applied security settings: insecure guest logons disabled, NTLMv2-only authentication enforced, and logon event auditing enabled for both success and failure — hardening endpoints against credential exposure.</figcaption>
          </figure>

          <h3>Server Security Baseline</h3>
          <p>
            A <code>Server-Security-Baseline</code> GPO was linked to the LAB-Servers OU. Using
            Restricted Groups policy, local Administrators group membership on all servers was centrally
            locked to only <code>LAB\Domain Admins</code> and <code>LAB\GG-T1-ServerAdmins</code>.
          </p>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/admin-tier-logon-restriction.png" alt="Group Policy Restricted Groups configuration locking server local admins" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 7 — Server Security Baseline — Restricted Groups.</strong> The Server-Security-Baseline GPO configured via Restricted Groups policy, locking the local Administrators group on all servers to LAB\Domain Admins and LAB\GG-T1-ServerAdmins only — preventing unauthorised privilege escalation from lower-tier accounts.</figcaption>
          </figure>

          <h3>Microsoft LAPS</h3>
          <p>
            Microsoft LAPS was deployed to eliminate shared local administrator passwords across
            workstations. LAPS automatically generates unique, periodically rotated passwords per
            workstation and stores them securely in Active Directory, retrievable only by authorised
            administrators.
          </p>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Setting</th><th>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Password Length</td><td>14 characters</td></tr>
                <tr><td>Password Complexity</td><td>Letters, numbers, special characters</td></tr>
                <tr><td>Password Rotation</td><td>Every 7 days</td></tr>
                <tr><td>Backup Location</td><td>Active Directory</td></tr>
              </tbody>
            </table>
          </div>
          <div class="code-block">
            <span class="code-label">PowerShell</span>
            <pre><code>Get-LapsADPassword CLIENT01</code></pre>
          </div>
        </section>

        <!-- FILE SERVER -->
        <section id="fileserver">
          <h2>06. File Server Access Control</h2>
          <p>
            Least privilege was demonstrated through controlled access to three departmental file shares
            hosted on FS01 (Finance, IT, and Public), ensuring users could only access data required
            for their role.
          </p>

          <h3>AGDLP Permission Model</h3>
          <div class="code-block">
            <span class="code-label">AGDLP Chain</span>
            <pre><code>User Account → Global Group → Domain Local Group → NTFS Permissions

Example:
finance.user → GG-Finance-Users → DL-FS-Finance-RW → Modify (NTFS)</code></pre>
          </div>

          <h3>NTFS Permission Assignments</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Share</th><th>Group</th><th>Access Level</th></tr>
              </thead>
              <tbody>
                <tr><td>Finance</td><td>DL-FS-Finance-RW</td><td>Modify</td></tr>
                <tr><td>Finance</td><td>DL-FS-Finance-RO</td><td>Read and Execute</td></tr>
                <tr><td>IT</td><td>DL-FS-IT-RW</td><td>Modify</td></tr>
                <tr><td>Public</td><td>DL-FS-Public-RO</td><td>Read and Execute</td></tr>
              </tbody>
            </table>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/NTFS.png" alt="NTFS Advanced Security Settings for IT share" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 8 — NTFS Permissions — IT Share.</strong> Advanced Security Settings on the IT share confirming DL-FS-IT-RW (LAB\DL-FS-IT-RW) is the only non-system group with Modify access — all other principals are restricted to system accounts and the owner.</figcaption>
          </figure>

          <div class="callout callout--insight">
            <span class="callout-label">Key Insight</span>
            <p>
              A finance user who cannot enumerate the IT share cannot identify targets for lateral
              movement or data exfiltration. Least privilege combined with Access-Based Enumeration
              functions as both an access control and a reconnaissance countermeasure.
            </p>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/access-based-enumeration.png" alt="Access-Based Enumeration enabled on File Server shares" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 9 — Access-Based Enumeration (ABE).</strong> ABE enabled on the FS01 file server shares via File and Storage Services. With ABE active, users only see folders they have permissions to access — folders they cannot read are hidden entirely, eliminating passive reconnaissance paths.</figcaption>
          </figure>

          <h3>Validation Results</h3>
          <ul class="content-list">
            <li><strong>finance.user</strong> — accessed Finance share only; IT and Public folders not visible</li>
            <li><strong>it.user</strong> — accessed IT share only; Finance folder not visible</li>
            <li><strong>public.user</strong> — restricted to Public share only</li>
          </ul>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/Users.png" alt="User account group membership properties for public, IT, and finance users" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 10 — User Group Memberships.</strong> Active Directory properties confirming role-based group assignments: public.user is a member of GG-Public-Users only; it.user is a member of GG-IT-Users only; finance.user is a member of GG-Finance-Users only — each scoped to the minimum access required for their role.</figcaption>
          </figure>
        </section>

        <!-- HYBRID IDENTITY -->
        <section id="hybrid">
          <h2>07. Hybrid Identity Integration</h2>
          <p>
            To extend identity management capabilities to the cloud, the on-premises Active Directory
            environment was integrated with Microsoft Entra ID using Microsoft Entra provisioning agents
            installed on AADSYNC01.
          </p>
          <p>
            Without hybrid identity, organisations managing both environments risk operating two
            disconnected identity planes — one governed by Active Directory policies, and one ungoverned
            in the cloud. This fragmentation creates conditions where least privilege applied on-premises
            is not carried through to cloud resource access, undermining the model at the boundary.
          </p>

          <div class="callout callout--insight">
            <span class="callout-label">Architecture Decision</span>
            <p>
              By synchronising identities through Entra provisioning agents, the project established a
              single authoritative identity source spanning both environments — ensuring role-based
              controls defined in Active Directory are consistently reflected in cloud identity governance.
            </p>
          </div>
        </section>

        <!-- ENTRA -->
        <section id="entra">
          <h2>08. Microsoft Entra Security Controls</h2>
          <p>
            Following hybrid synchronisation, Microsoft Entra ID extended the on-premises governance
            model into the cloud via RBAC, Privileged Identity Management, and Conditional Access.
          </p>

          <h3>Entra RBAC Role Assignments</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Role</th><th>Purpose</th><th>Assignment Type</th></tr>
              </thead>
              <tbody>
                <tr><td>Global Administrator</td><td>Tenant configuration &amp; identity management</td><td>Eligible (JIT)</td></tr>
                <tr><td>User Administrator</td><td>User lifecycle &amp; group management</td><td>Eligible (JIT)</td></tr>
                <tr><td>Security Reader</td><td>Security monitoring &amp; log review</td><td>Active (permanent)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Just-In-Time Privilege Elevation (PIM)</h3>
          <p>
            Privileged roles are assigned as <em>eligible</em> rather than permanently active, requiring
            administrators to activate them through the PIM interface with operational justification
            and a service desk ticket reference. Activated roles expire after one hour with a full
            audit record generated per activation.
          </p>
          <div class="code-block">
            <span class="code-label">PIM Activation — Audit Record Example</span>
            <table class="audit-table">
              <tbody>
                <tr><td class="audit-key">Role</td><td class="audit-val">User Administrator</td></tr>
                <tr><td class="audit-key">Resource</td><td class="audit-val">SME-ZeroTrust-Lab</td></tr>
                <tr><td class="audit-key">Start</td><td class="audit-val">March 15, 2026 11:59 UTC</td></tr>
                <tr><td class="audit-key">End</td><td class="audit-val">March 15, 2026 12:59 UTC</td></tr>
                <tr><td class="audit-key">Justification</td><td class="audit-val">Resetting the password for User-X</td></tr>
                <tr><td class="audit-key">Ticket system</td><td class="audit-val">ConnectWise</td></tr>
                <tr><td class="audit-key">Ticket number</td><td class="audit-val">#3334444</td></tr>
              </tbody>
            </table>
          </div>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/just-in-time.png" alt="PIM Just-In-Time activation request and completion status" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 11 — PIM Just-In-Time Activation.</strong> Left: activation request for the User Administrator role with a 1-hour duration, ConnectWise ticket reference, and operational justification. Right: activation status confirming all three stages completed successfully — the role is now active and will expire automatically after the defined window.</figcaption>
          </figure>

          <h3>Conditional Access — MFA for Privileged Roles</h3>
          <p>
            Conditional Access was configured to require MFA for all privileged administrative accounts,
            ensuring elevated roles are protected by explicit identity verification beyond passwords alone.
          </p>

          <figure class="arch-figure">
            <img src="@/assets/images/LeastPrivilage/conditional-access-policy.png" alt="Conditional Access policy requiring MFA for privileged roles" class="arch-image" />
            <figcaption class="arch-caption"><strong>Fig. 12 — Conditional Access Policy — CA-Require-MFA-For-Privileged-Roles.</strong> The policy targets all users assigned privileged roles, requires multi-factor authentication as the grant control, and applies to all cloud resources — ensuring no privileged action can be performed on password alone.</figcaption>
          </figure>
        </section>

        <!-- FINDINGS -->
        <section id="findings">
          <h2>09. Findings & Conclusion</h2>
          <p>
            This project successfully designed, implemented, and evaluated a hybrid least privilege
            architecture within a simulated SME environment, demonstrating that least privilege functions
            as a practical and high-impact Zero Trust control even under resource constraints.
          </p>

          <h3>Key Outcomes</h3>
          <ul class="content-list">
            <li><strong>Persistent admin privileges eliminated</strong> — replaced with role-based assignments and JIT elevation via PIM</li>
            <li><strong>Shared local admin passwords replaced</strong> — unique, rotating credentials per workstation via LAPS</li>
            <li><strong>Unrestricted file share visibility eliminated</strong> — strictly scoped NTFS access with ABE removing reconnaissance paths</li>
            <li><strong>Tier isolation enforced</strong> — GPO boundaries prevent lower-tier credentials from accessing higher-value systems</li>
            <li><strong>Unified identity plane</strong> — hybrid Entra ID sync eliminates the privilege gap at the environment boundary</li>
          </ul>

          <h3>Limitations</h3>
          <p>
            The implementation assumes consistent identity governance and disciplined role management.
            Operational pressures may lead to privilege creep over time. The project is a controlled
            simulation and does not incorporate endpoint detection, device compliance policies, or
            network-level segmentation.
          </p>

          <div class="callout">
            <span class="callout-label">Conclusion</span>
            <p>
              Meaningful Zero Trust-aligned security improvements are achievable without full
              architectural transformation. By combining RBAC, administrative tiering, LAPS, hybrid
              identity synchronisation, cloud role governance, and JIT privilege elevation, the
              implementation significantly reduced unnecessary access rights. Least privilege is a
              realistic and measurable first step for small enterprises strengthening their
              cybersecurity posture.
            </p>
          </div>

          <h3>References</h3>
          <ul class="references-list">
            <li>Center for Internet Security. (2023). <em>CIS Microsoft Windows Server 2022 benchmark.</em></li>
            <li>Joint Task Force. (2020). <em>Security and privacy controls for information systems and organizations.</em> NIST SP 800-53r5.</li>
            <li>Lund, B. D., et al. (2024). Zero trust cybersecurity: Procedures and considerations in context. <em>Encyclopedia, 4</em>(4), 99.</li>
            <li>Microsoft. (2022). <em>Enterprise access model.</em> Microsoft Learn.</li>
            <li>Microsoft. (2023). <em>Windows LAPS overview.</em> Microsoft Learn.</li>
            <li>Microsoft. (2024). <em>What is Microsoft Entra Privileged Identity Management?</em> Microsoft Learn.</li>
            <li>National Cyber Security Centre. (2022). <em>Introduction to identity and access management.</em> NCSC.</li>
            <li>Rose, S., et al. (2020). <em>Zero trust architecture.</em> NIST SP 800-207.</li>
            <li>Syed, S. (2025). Zero trust principles and the evolution of privilege access management architectures. <em>Journal of Computer Science and Technology Studies, 7</em>(7), 866–873.</li>
          </ul>
        </section>

      </article>

      <div class="paper-footer">
        <router-link to="/security" class="back-link">&#8592; back to security</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import PaperSideNav from '@/components/ui/PaperSideNav.vue';

export default {
  components: { PaperSideNav },
  data() {
    return {
      sections: [
        { id: 'overview',     number: '01', label: 'Overview' },
        { id: 'literature',   number: '02', label: 'Literature Review' },
        { id: 'environment',  number: '03', label: 'Lab Environment' },
        { id: 'rbac',         number: '04', label: 'RBAC & Admin Tiering' },
        { id: 'hardening',    number: '05', label: 'Security Hardening' },
        { id: 'fileserver',   number: '06', label: 'File Server Access' },
        { id: 'hybrid',       number: '07', label: 'Hybrid Identity' },
        { id: 'entra',        number: '08', label: 'Entra Security Controls' },
        { id: 'findings',     number: '09', label: 'Findings & Conclusion' }
      ]
    };
  },
  mounted() {
    window.scrollTo(0, 0);
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

/* PAPER CONTAINER */
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

  &:hover {
    color: #7c4ff5;
  }
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

/* ARTICLE BODY */
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

    em {
      color: $color-primary-light;
      font-style: italic;
    }

    strong {
      color: $color-primary-light;
      font-weight: 600;
    }
  }
}

.arch-figure {
  margin: 2.4rem 0;
  border: 1px solid $border-secondary;
  border-radius: 2px;
  overflow: hidden;
}

.arch-image {
  display: block;
  width: 100%;
  height: auto;
}

.arch-caption {
  display: block;
  font-family: $font-secondary;
  font-size: $text-small;
  color: $color-primary-dark;
  line-height: 1.8;
  padding: 1.4rem 1.6rem;
  border-top: 1px solid $border-secondary;
  background-color: $background-skill;

  strong {
    color: $color-primary-light;
    font-weight: 600;
  }
}

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

  p {
    margin-bottom: 0 !important;
    color: $color-primary-light !important;
  }

  &--insight {
    background-color: rgba(52, 58, 65, 0.5);
    border-left-color: $border-primary;

    .callout-label {
      color: $color-primary-dark;
    }

    p {
      color: $color-primary-dark !important;
    }
  }
}

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

    tr:last-child td {
      border-bottom: none;
    }
  }
}

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
    }
  }

}

.audit-table {
  width: 100%;
  border-collapse: collapse;
  padding: 1.6rem;
  display: table;

  td {
    display: table-cell;
    font-family: $font-secondary;
    font-size: $text-small;
    line-height: 1.8;
    padding: 0.3rem 1.4rem;
    vertical-align: top;
  }
}

.audit-key {
  color: #f0eef5 !important;
  white-space: nowrap;
  width: 1%;
}

.audit-val {
  color: #7c4ff5 !important;
}

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

.references-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 1.2rem 0;

  li {
    display: block;
    font-family: $font-secondary;
    font-size: $text-small;
    color: $color-primary-dark;
    line-height: 1.8;
    padding: 0.6rem 0;
    border-bottom: 1px solid $border-secondary;

    &:last-child {
      border-bottom: none;
    }
  }
}

.paper-footer {
  padding-top: 4rem;
  border-top: 1px solid $border-secondary;
  margin-top: 2rem;
}
</style>
