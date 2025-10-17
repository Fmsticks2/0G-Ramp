export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Product</h4>
          <a href="#">Dashboard</a>
          <a href="#">On-Ramp</a>
          <a href="#">Off-Ramp</a>
        </div>
        <div className="footer-col">
          <h4>Developers</h4>
          <a href="#">Docs</a>
          <a href="#">API</a>
          <a href="#">Webhooks</a>
        </div>
        <div className="footer-col">
          <h4>Network</h4>
          <a href="https://evmrpc-testnet.0g.ai" target="_blank" rel="noreferrer">0G RPC</a>
          <a href="https://chainscan-galileo.0g.ai" target="_blank" rel="noreferrer">Explorer</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Security</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Velora Ramp</span>
        <span>Built for scale • Premium UX</span>
      </div>
    </footer>
  )
}