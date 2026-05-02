<template>
  <div class="paper-layout">

    <paper-side-nav :sections="sections" />

    <div class="paper-container">
      <div class="paper-header">
        <router-link to="/case-studies" class="back-link">&#8592; back to case studies</router-link>
        <div class="paper-meta">
          <span class="paper-tag">Network Infrastructure</span>
          <span class="paper-tag">Firewall Recovery</span>
          <span class="paper-tag">FreeBSD</span>
        </div>
        <h1>pfSense Plus Recovery After Power Outage — Netgate 8200</h1>
        <p class="paper-subtitle">
          Landmark Technologies &mdash; Field Engineering Case Study &mdash; 2025
        </p>
      </div>

      <article class="paper-body">

        <section id="overview">
          <h2>01. Overview</h2>
          <div class="meta-grid">
            <div class="meta-item"><span class="meta-label">Device</span><span class="meta-value">Netgate 8200 Security Gateway</span></div>
            <div class="meta-item"><span class="meta-label">OS</span><span class="meta-value">pfSense Plus 23.05.1 (FreeBSD 14.0)</span></div>
            <div class="meta-item"><span class="meta-label">Issue</span><span class="meta-value">ZFS filesystem corruption from unexpected power outage</span></div>
            <div class="meta-item"><span class="meta-label">Outcome</span><span class="meta-value">Full recovery — config retrieved, OS reinstalled, config restored</span></div>
            <div class="meta-item"><span class="meta-label">Recovery Time</span><span class="meta-value">~4–5 hours</span></div>
          </div>
          <p>
            A production Netgate 8200 firewall running pfSense Plus became completely unbootable
            following an unexpected power outage. The device entered a kernel panic loop on every
            boot attempt, dropping into the FreeBSD kernel debugger (<code>db&gt;</code>) before the
            OS could load. This case study documents every diagnostic step taken, the failed recovery
            attempts, and the final successful recovery path — including a creative network workaround
            that unblocked the installation process.
          </p>
        </section>

        <section id="root-cause">
          <h2>02. Root Cause</h2>
          <h3>Why ZFS Corrupts on Power Loss</h3>
          <p>
            ZFS is a copy-on-write filesystem that writes data in transactions. If power is cut
            mid-transaction, the pool is left in an inconsistent state — some pointers reference
            data that does not yet exist. pfSense Plus uses ZFS as its primary filesystem, making
            it vulnerable to this exact scenario.
          </p>
          <div class="code-block">
            <span class="code-label">Kernel Panic — Observed Error</span>
            <pre><code>panic: zfs(panic): zfs: rt={spa=pfSense vdev_guid=5984199624752192702 ms_id=99
ms_allocatable}: adding segment (offset=18eac56000 size=7000) overlapping
with existing one (offset=18eac58000 size=3000)</code></pre>
          </div>
          <p>
            This indicates the ZFS pool had an inconsistent segment allocation map — a direct result
            of an interrupted write transaction during the power outage.
          </p>
          <h3>Why pfSense Was Especially Vulnerable</h3>
          <ul class="content-list">
            <li>The Netgate 8200 uses NVMe/SSD storage with write caches that do not flush instantly on power loss</li>
            <li>pfSense is a live firewall — constantly writing logs, state tables, and DHCP leases even when idle</li>
            <li>The combination makes mid-write interruptions statistically likely during any unexpected power event</li>
          </ul>
        </section>

        <section id="symptoms">
          <h2>03. Symptoms & Remote Access</h2>
          <h3>Symptoms</h3>
          <ul class="content-list">
            <li>Device powered on but immediately entered kernel panic</li>
            <li>Console showed <code>KDB: enter: panic</code> followed by <code>db&gt;</code> prompt</li>
            <li>Every attempt to continue (<code>cont</code>) triggered another panic</li>
            <li>Boot loader could not see the ZFS pool — <code>lszfs zroot/ROOT</code> returned <code>device not configured</code></li>
            <li>Only the EFI partition was accessible, not the main ZFS filesystem</li>
          </ul>
          <h3>Remote Access Setup</h3>
          <p>
            Serial console access was used throughout the recovery via:
          </p>
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Tool</th><th>Configuration</th></tr></thead>
              <tbody>
                <tr><td>Serial Console</td><td>Micro-USB → on-site laptop</td></tr>
                <tr><td>PuTTY</td><td>COM4, 115200 baud, 8N1</td></tr>
                <tr><td>Datto RMM</td><td>Remote access to on-site laptop</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout--insight">
            <span class="callout-label">Latency Workaround</span>
            <p>Remote access introduced latency when catching short boot menu timers. Fix: set a longer autoboot delay before rebooting.</p>
          </div>
          <div class="code-block">
            <span class="code-label">Boot Loader</span>
            <pre><code>set autoboot_delay=30</code></pre>
          </div>
        </section>

        <section id="diagnostics">
          <h2>04. Diagnostic Steps</h2>

          <h3>1. Kernel Debugger Assessment (<code>db&gt;</code>)</h3>
          <ul class="content-list">
            <li>Confirmed panic type: ZFS segment range tree corruption</li>
            <li>Retrieved pfSense version via <code>sysctl kern.version</code> → pfSense Plus 23.05.1, FreeBSD 14.0</li>
            <li>Attempted <code>cont</code> to continue boot — resulted in repeated panic at same address</li>
          </ul>

          <h3>2. Boot Loader Diagnostics (<code>OK</code> prompt)</h3>
          <ul class="content-list">
            <li>Accessed boot loader by catching the pfSense boot menu and pressing <code>Esc</code></li>
            <li><code>lszfs zroot/ROOT</code> → returned <code>device not configured</code> — pool completely invisible</li>
            <li><code>ls /</code> showed only EFI partition contents — ZFS filesystem inaccessible</li>
          </ul>

          <h3>3. EFI Boot Manager Discovery</h3>
          <p>
            Identified an early EFI Boot Manager menu appearing before the pfSense menu with options
            for <code>r</code> (clear boot order), <code>p</code> (PXE boot), and <code>F2</code> (Boot Manager Menu).
            This menu later became the path used to boot the USB installer.
          </p>
        </section>

        <section id="recovery-attempts">
          <h2>05. Recovery Attempts</h2>

          <div class="attempt attempt--fail">
            <span class="attempt-label">Attempt 1 — Failed</span>
            <h3>ZFS Recovery Boot (Single User)</h3>
            <div class="code-block">
              <span class="code-label">Boot Loader</span>
              <pre><code>set vfs.zfs.recover=1
set vfs.zfs.unsafe_reads=1
boot -s</code></pre>
            </div>
            <p>Kernel panicked again before single user mode could load. The ZFS corruption was too severe to mount the pool even in recovery mode.</p>
          </div>

          <div class="attempt attempt--fail">
            <span class="attempt-label">Attempt 2 — Failed</span>
            <h3>Standard Boot from USB Installer</h3>
            <p>Booted the pfSense Plus installer USB via the EFI Boot Manager. The installer itself triggered a kernel panic — the corrupted ZFS pool on the internal NVMe drive interfered with storage detection.</p>
          </div>

          <div class="attempt attempt--success">
            <span class="attempt-label">Attempt 3 — Success</span>
            <h3>ZFS Debug Mode Boot</h3>
            <div class="code-block">
              <span class="code-label">Boot Loader</span>
              <pre><code>set vfs.zfs.recover=1
set vfs.zfs.debug=1
boot</code></pre>
            </div>
            <p>Enabling ZFS debug mode alongside recover mode allowed the system to boot far enough to launch the USB installer environment without panicking.</p>
          </div>
        </section>

        <section id="config-recovery">
          <h2>06. Config File Recovery</h2>
          <p>
            Once booted into the pfSense installer recovery shell, the priority was retrieving
            the existing configuration before reinstallation wiped the drive.
          </p>

          <h3>Step 1 — Mount the Corrupted Pool Read-Only</h3>
          <div class="code-block">
            <span class="code-label">Installer Shell</span>
            <pre><code>zpool export pfSense
zpool import -f -o readonly=on -R /tmp pfSense</code></pre>
          </div>
          <p>The <code>-f</code> flag forces import despite corruption. <code>readonly=on</code> prevents writes that could worsen the state. The pool imported successfully.</p>

          <h3>Step 2 — Locate and Mount the Config Dataset</h3>
          <p>
            The ZFS datasets are not automatically mounted into the path hierarchy — they need
            to be mounted manually. The config lives in <code>pfSense/ROOT/default/cf</code>.
          </p>
          <div class="code-block">
            <span class="code-label">Installer Shell</span>
            <pre><code>mkdir /tmp/cf
zfs mount pfSense/ROOT/default/cf
ls -lah /tmp/cf/conf    # config.xml (192KB), backup/, rules.debug.old</code></pre>
          </div>

          <h3>Step 3 — Copy Config to USB</h3>
          <div class="code-block">
            <span class="code-label">Installer Shell</span>
            <pre><code>mkdir /media
mount -t msdosfs /dev/da1s1 /media
cp /tmp/cf/conf/config.xml /media/
cp /tmp/cf/conf/config.xml /media/config_backup.xml
grep "&lt;lastchange&gt;" /tmp/cf/conf/config.xml    # verify not empty</code></pre>
          </div>
          <div class="callout">
            <span class="callout-label">Result</span>
            <p>Config file successfully recovered and saved to USB. Both copies verified at 192KB.</p>
          </div>
        </section>

        <section id="reinstallation">
          <h2>07. OS Reinstallation</h2>

          <h3>The Network Validation Problem</h3>
          <p>
            The pfSense Plus installer attempts to contact Netgate's activation servers during
            installation, requiring internet on the WAN interface. Connecting WAN to a standard
            home router at <code>192.168.1.1</code> caused a <strong>subnet conflict</strong>:
            pfSense's default LAN is also <code>192.168.1.1/24</code>, creating a routing loop.
            The installer looped back to the network configuration screen indefinitely.
          </p>
          <p>
            Attempts to resolve this by modifying network settings inside the recovery console
            failed — exiting the recovery shell triggered a full restart of the installation,
            clearing all changes.
          </p>

          <h3>Solution — Android USB Tethering</h3>
          <div class="callout callout--insight">
            <span class="callout-label">The Workaround</span>
            <p>Connected an Android phone to the Netgate 8200 WAN port via USB-C to RJ45 adapter with USB/mobile hotspot tethering enabled. Android's DHCP uses a subnet that does not conflict with pfSense's default LAN (<code>192.168.1.0/24</code>), allowing WAN to route outbound traffic cleanly.</p>
          </div>

          <div class="callout callout--warn">
            <span class="callout-label">Hardware Compatibility — Netgate 8200 NVMe</span>
            <p>The Netgate 8200 is only compatible with <strong>M.2 B+M-key or B-key PCIe NVMe SSDs</strong>. M-key only drives will not be recognised. Verify the key type before purchasing a replacement drive — incorrect key type is a common and costly mistake during hardware-assisted recovery.</p>
          </div>

          <h3>Installation Steps</h3>
          <div class="code-block">
            <span class="code-label">Installer</span>
            <pre><code>1. Boot from USB via EFI Boot Manager (F2)
2. Accept copyright notice → Enter
3. Select: Install pfSense Plus
4. Partitioning: Auto ZFS
5. ZFS configuration: Stripe (single disk)
6. Select drive: nda0 (internal NVMe)
7. Confirm: destroy existing data → YES
8. Wait ~5–10 minutes
9. Remove USB when prompted → Reboot</code></pre>
          </div>
        </section>

        <section id="restore">
          <h2>08. Config Restore & Verification</h2>
          <ul class="content-list">
            <li>Connected a laptop to the LAN port, browsed to <code>https://192.168.1.1</code></li>
            <li>Logged in with default credentials: <code>admin / pfsense</code></li>
            <li>Navigated to <strong>Diagnostics → Backup & Restore</strong></li>
            <li>Uploaded <code>config.xml</code> from USB — pfSense applied config and rebooted</li>
            <li>Verified all interfaces, firewall rules, NAT, VPN, and DHCP settings intact</li>
          </ul>
          <div class="callout">
            <span class="callout-label">Outcome</span>
            <p>Full functionality restored. Total recovery time approximately 4–5 hours.</p>
          </div>

          <h3>Recovery Summary</h3>
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Phase</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>ZFS recovery boot — single user mode</td><td class="result-fail">Failed — panicked before loading</td></tr>
                <tr><td>Installer boot — standard</td><td class="result-fail">Failed — NVMe interference</td></tr>
                <tr><td>ZFS debug mode boot</td><td class="result-pass">Success</td></tr>
                <tr><td>Config recovery via read-only ZFS import</td><td class="result-pass">Success</td></tr>
                <tr><td>Network — home router (192.168.1.1)</td><td class="result-fail">Failed — subnet conflict</td></tr>
                <tr><td>Network — Android USB tethering</td><td class="result-pass">Success</td></tr>
                <tr><td>Config restore post-reinstall</td><td class="result-pass">Success</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="lessons">
          <h2>09. Key Lessons & Prevention</h2>

          <h3>Key Lessons</h3>
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Lesson</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>Power outages can corrupt ZFS at OS level</td><td>Install a UPS on all firewall and network devices</td></tr>
                <tr><td>Standard ZFS recovery may not be enough</td><td>Document <code>vfs.zfs.debug=1</code> — unlocks situations where recover mode alone fails</td></tr>
                <tr><td>Installer network validation causes subnet conflicts</td><td>Use a phone hotspot or isolated network for WAN during reinstall</td></tr>
                <tr><td>Recovery console changes are lost on installer restart</td><td>Fix the source of the conflict — do not rely on in-shell network config changes</td></tr>
                <tr><td>Config backups are critical</td><td>Enable pfSense Auto Config Backup (Services → Auto Config Backup)</td></tr>
                <tr><td>Serial console access is essential for remote recovery</td><td>Document COM port, baud rate (115200), and cable type in advance</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Prevention</h3>
          <ul class="content-list">
            <li><strong>UPS on all network infrastructure</strong> — even a basic unit (€50–100) prevents this scenario entirely</li>
            <li><strong>Remote config backups</strong> — pfSense Auto Config Backup stores up to 100 encrypted snapshots automatically on every config change</li>
            <li><strong>Pre-made installer USB</strong> — keep a current pfSense Plus installer USB stored on-site, ready to use</li>
            <li><strong>Document Netgate serial numbers and account credentials</strong> before an incident — the installer requires a valid Netgate account</li>
          </ul>
        </section>

        <section id="resources">
          <h2>10. References & Resources</h2>
          <p>Official documentation and tools referenced during this recovery.</p>
          <ul class="resources-list">
            <li>
              <a href="https://shop.netgate.com/products/netgate-installer?variant=41345658388595" target="_blank" rel="noopener">Netgate Installer Download</a>
              <span>Official pfSense Plus installer download portal. Requires a valid Netgate account with the device serial number claimed. Download the AMD64 ISO matching your installed version.</span>
            </li>
            <li>
              <a href="https://docs.netgate.com/pfsense/en/latest/install/netinstaller.html" target="_blank" rel="noopener">Netgate Installer Documentation</a>
              <span>Official guide to preparing and booting the pfSense Plus installer USB, including EFI boot menu navigation and installation options.</span>
            </li>
            <li>
              <a href="https://docs.netgate.com/pfsense/en/latest/install/install-walkthrough.html#install-config-recovery" target="_blank" rel="noopener">Install Config Recovery — pfSense Docs</a>
              <span>Documentation covering config recovery options available during the installation process, including accessing the recovery shell to retrieve existing configuration files.</span>
            </li>
            <li>
              <a href="https://docs.netgate.com/pfsense/en/latest/install/install-walkthrough.html#configuration-restore" target="_blank" rel="noopener">Configuration Restore — pfSense Docs</a>
              <span>Step-by-step guide for restoring a saved <code>config.xml</code> backup via Diagnostics → Backup & Restore after a clean OS installation.</span>
            </li>
            <li>
              <a href="https://www.balena.io/etcher/" target="_blank" rel="noopener">Balena Etcher</a>
              <span>Cross-platform USB flashing tool used to write the pfSense Plus ISO to a USB drive. Reliable alternative to Rufus on non-Windows systems.</span>
            </li>
          </ul>
        </section>

      </article>

      <div class="paper-footer">
        <router-link to="/case-studies" class="back-link">&#8592; back to case studies</router-link>
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
        { id: 'overview',          number: '01', label: 'Overview' },
        { id: 'root-cause',        number: '02', label: 'Root Cause' },
        { id: 'symptoms',          number: '03', label: 'Symptoms & Remote Access' },
        { id: 'diagnostics',       number: '04', label: 'Diagnostic Steps' },
        { id: 'recovery-attempts', number: '05', label: 'Recovery Attempts' },
        { id: 'config-recovery',   number: '06', label: 'Config Recovery' },
        { id: 'reinstallation',    number: '07', label: 'OS Reinstallation' },
        { id: 'restore',           number: '08', label: 'Restore & Verification' },
        { id: 'lessons',           number: '09', label: 'Key Lessons' },
        { id: 'resources',         number: '10', label: 'References & Resources' }
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

/* Meta grid for overview */
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

/* Attempt blocks */
.attempt {
  margin: 2rem 0;
  border: 1px solid $border-secondary;
  border-radius: 2px;
  overflow: hidden;

  h3 {
    margin-top: 0 !important;
    padding: 1.2rem 1.6rem 0;
  }

  p {
    padding: 0 1.6rem 1.6rem;
    margin-bottom: 0 !important;
  }

  .code-block {
    margin: 0 1.6rem 1.6rem;
  }
}

.attempt-label {
  display: block;
  font-family: $font-secondary;
  font-size: $text-extra-small;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.6rem 1.6rem;
  font-weight: 600;
}

.attempt--fail {
  border-color: rgba(220, 80, 80, 0.3);
  .attempt-label {
    background-color: rgba(220, 80, 80, 0.08);
    color: #e06060;
  }
}

.attempt--success {
  border-color: rgba(80, 200, 120, 0.3);
  .attempt-label {
    background-color: rgba(80, 200, 120, 0.08);
    color: #50c878;
  }
}

/* Result cells in summary table */
.result-pass { color: #50c878; }
.result-fail { color: #e06060; }

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

      code {
        font-size: $text-extra-small;
        color: #7c4ff5;
        background-color: $background-skill;
        padding: 0.1rem 0.4rem;
        border-radius: 2px;
      }
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

.paper-footer {
  padding-top: 4rem;
  border-top: 1px solid $border-secondary;
  margin-top: 2rem;
}
</style>
