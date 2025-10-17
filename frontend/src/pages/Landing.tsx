import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'
import SectionHeader from '../components/SectionHeader'

export default function Landing() {
  return (
    <div className="landing" style={{ display: 'grid', gap: 24 }}>
      {/* Hero */}
      <div className="hero">
        <div className="hero-left">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Ramp to 0G, Built for Scale.
          </motion.h1>
          <p className="hero-sub">Fiat ↔ Stablecoins with immutable receipts on 0G. Fast, audit-ready, and developer-first.</p>
          <div className="hero-cta" style={{ alignItems: 'center' }}>
            <Link to="/dashboard" className="glow-btn primary">Get Started</Link>
            <Link to="/dashboard" className="glow-btn secondary">On-Ramp</Link>
            <Link to="/dashboard" className="glow-btn secondary">Off-Ramp</Link>
            <Link to="/developers" className="glow-btn secondary">Docs</Link>
          </div>
        </div>
        <motion.div className="card" style={{ padding: 24, minWidth: 360 }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <SectionHeader title="Why Velora" subtitle="Reliability, speed, verifiability." />
          <ul style={{ marginTop: 8, display: 'grid', gap: 8 }}>
            <li className="muted">• Immutable, content-addressed receipts stored on 0G</li>
            <li className="muted">• Instant settlement and low-latency flows</li>
            <li className="muted">• Developer-first SDKs with clean REST APIs</li>
            <li className="muted">• WalletConnect-ready with secure session model</li>
          </ul>
        </motion.div>
      </div>

      {/* Trust & Logos */}
      <div className="card" style={{ padding: 16 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Trusted by builders</div>
            <div className="section-subtitle">Partner-ready integrations and transparent receipts</div>
          </div>
          <div className="section-actions" style={{ flexWrap: 'wrap' }}>
            <span className="badge badge-info">0G Labs</span>
            <span className="badge badge-info">DeFi Partner</span>
            <span className="badge badge-info">Custody Provider</span>
            <span className="badge badge-info">Audit Firm</span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <StatCard title="Processed Volume" value="$12.4M" hint="Since testnet launch" />
        <StatCard title="Avg Confirmation" value="14s" hint="Wallet → Receipt stored" />
        <StatCard title="Receipts on 0G" value="243,102" hint="Content-addressed proofs" />
      </div>

      {/* Features */}
      <div className="features-grid">
        <div className="card" style={{ padding: 20 }}>
          <SectionHeader title="Immutable Receipts" subtitle="Verifiable audit trail" />
          <p className="muted">Every on/off-ramp action persists an immutable receipt on 0G storage with a content ID (CID). Auditors and partners can independently verify proofs.</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <SectionHeader title="Instant Settlement" subtitle="Low latency flows" />
          <p className="muted">Designed for high throughput: minimal latency from initiation to confirmation. Smooth UX for retail, robust for enterprise-grade volumes.</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <SectionHeader title="Developer-First" subtitle="SDKs & clean REST" />
          <p className="muted">Integrate in minutes with secure endpoints and typed SDKs. Use a simple session model to create on-ramp flows and subscribe to webhooks.</p>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="cta-banner">
        <div className="text">
          <div className="section-title">Start building with Velora</div>
          <div className="section-subtitle">Deploy in minutes with secure endpoints, webhooks, and typed SDKs.</div>
        </div>
        <div className="section-actions">
          <Link to="/developers" className="glow-btn primary">View Docs</Link>
          <Link to="/dashboard" className="glow-btn secondary">Launch Dashboard</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/dashboard">On-Ramp</Link>
            <Link to="/dashboard">Off-Ramp</Link>
            <Link to="/transactions">Transactions</Link>
          </div>
          <div className="footer-col">
            <h4>Developers</h4>
            <Link to="/developers">API Docs</Link>
            <a href="#">Webhooks</a>
            <a href="#">SDKs</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Partners</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Compliance</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2025 Velora. All rights reserved.</div>
          <div className="section-actions">
            <Link to="/developers" className="glow-btn secondary">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}