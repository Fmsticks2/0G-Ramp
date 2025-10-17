import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/ui/Card'

export default function Landing() {
  return (
    <div className="grid">
      {/* Hero */}
      <div className="hero hero-centered">
        <div className="hero-left">
          <motion.h1
            className="hero-title hero-title-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Ramp to 0G, Built for Scale.
          </motion.h1>
          <p className="hero-sub">Fiat ↔ Stablecoins with immutable receipts on 0G. Fast, audit-ready, and developer-first.</p>
          <div className="hero-cta justify-center">
            <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
            <Link to="/dashboard" className="btn btn-secondary">On-Ramp</Link>
            <Link to="/dashboard" className="btn btn-secondary">Off-Ramp</Link>
            <Link to="/developers" className="btn btn-secondary">Docs</Link>
          </div>
        </div>
      </div>

      {/* Trust & Logos */}
      <Card padded>
        <div className="section-header">
          <div>
            <div className="section-title">Trusted by builders</div>
            <div className="section-subtitle">Partner-ready integrations and transparent receipts</div>
          </div>
          <div className="section-actions">
            <span className="badge badge-info">0G Labs</span>
            <span className="badge badge-info">DeFi Partner</span>
            <span className="badge badge-info">Custody Provider</span>
            <span className="badge badge-info">Audit Firm</span>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="kpi-grid">
        <StatCard title="Processed Volume" value="$12.4M" hint="Since testnet launch" />
        <StatCard title="Avg Confirmation" value="14s" hint="Wallet → Receipt stored" />
        <StatCard title="Receipts on 0G" value="243,102" hint="Content-addressed proofs" />
      </div>

      {/* Features */}
      <div className="features-grid">
        <Card padded>
          <SectionHeader title="Immutable Receipts" subtitle="Verifiable audit trail" />
          <p className="muted">Every on/off-ramp action persists an immutable receipt on 0G storage with a content ID (CID). Auditors and partners can independently verify proofs.</p>
        </Card>
        <Card padded>
          <SectionHeader title="Instant Settlement" subtitle="Low latency flows" />
          <p className="muted">Designed for high throughput: minimal latency from initiation to confirmation. Smooth UX for retail, robust for enterprise-grade volumes.</p>
        </Card>
        <Card padded>
          <SectionHeader title="Developer-First" subtitle="SDKs & clean REST" />
          <p className="muted">Integrate in minutes with secure endpoints and typed SDKs. Use a simple session model to create on-ramp flows and subscribe to webhooks.</p>
        </Card>
      </div>

      {/* CTA Banner */}
      <div className="cta-banner">
        <div className="text">
          <div className="section-title">Start building with Velora</div>
          <div className="section-subtitle">Deploy in minutes with secure endpoints, webhooks, and typed SDKs.</div>
        </div>
        <div className="section-actions">
          <Link to="/developers" className="btn btn-primary">View Docs</Link>
          <Link to="/dashboard" className="btn btn-secondary">Launch Dashboard</Link>
        </div>
      </div>
+      {/* CTA Banner */}
+      <Card padded>
+        <div className="section-header">
+          <div>
+            <div className="section-title">Start building with Velora</div>
+            <div className="section-subtitle">Deploy in minutes with secure endpoints, webhooks, and typed SDKs.</div>
+          </div>
+          <div className="section-actions">
+            <Link to="/developers" className="btn btn-primary">View Docs</Link>
+            <Link to="/dashboard" className="btn btn-secondary">Launch Dashboard</Link>
+          </div>
+        </div>
+      </Card>
    </div>
  )
}