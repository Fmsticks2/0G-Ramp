import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <div className="landing">
      <div className="hero">
        <div className="hero-left">
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Seamless Fiat ↔ Stablecoin Bridge on 0G Network.</motion.h1>
          <p className="hero-sub">Secure, instant, and immutable receipts. Powered by 0G.</p>
          <div className="hero-cta">
            <Link to="/dashboard" className="glow-btn">On-Ramp</Link>
            <Link to="/dashboard" className="glow-btn" style={{ background: '#1A1A1A', color: '#EAEAEA', border: '1px solid #222' }}>Off-Ramp</Link>
            <Link to="/developers" className="glow-btn" style={{ background: '#1A1A1A', color: '#EAEAEA', border: '1px solid #222' }}>Developers</Link>
          </div>
        </div>
        <motion.div className="card" style={{ padding: 24 }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="section-title">Highlights</div>
          <ul>
            <li>Secure</li>
            <li>Instant</li>
            <li>Immutable Receipts</li>
            <li>0G-Powered</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}