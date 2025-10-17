import SectionHeader from '../components/SectionHeader'

function CopyButton({ text }: { text: string }) {
  return (
    <button className="glow-btn secondary" onClick={() => navigator.clipboard.writeText(text)}>Copy</button>
  )
}

export default function Developer() {
  const rpc = import.meta.env.VITE_OG_RPC_URL || 'https://evmrpc-testnet.0g.ai'
  const chainId = import.meta.env.VITE_OG_CHAIN_ID || 16602

  const snippet = `// Create On-Ramp session
fetch('/api/onramp/create-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ walletAddress: '<WALLET_ADDR>', fiatAmount: 250, currency: 'USD' })
}).then(r => r.json()).then(console.log)

// Webhook example (server)
// POST /api/webhook/payment -> verify provider signature then update receipt on 0G
`

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="card" style={{ padding: 20 }}>
        <SectionHeader title="Developer API" subtitle="Endpoints, webhooks, and quick-start snippets" />
        <div className="grid grid-cols-2">
          <div>
            <div className="section-title">Endpoints</div>
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Path</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>POST</td>
                  <td>/api/onramp/create-session</td>
                  <td>Create a new on-ramp session</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>/api/webhook/payment</td>
                  <td>Provider → signature-verified callback</td>
                </tr>
                <tr>
                  <td>GET</td>
                  <td>/api/transactions/by-wallet/:address</td>
                  <td>List transactions by wallet</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="section-title">Quick Start</div>
            <pre style={{ background: '#0B0B0B', padding: 16, borderRadius: 12 }}>{snippet}</pre>
            <div style={{ marginTop: 8 }}>
              <CopyButton text={snippet} />
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <SectionHeader title="0G-Galileo-Testnet" subtitle="Network settings for integration" />
        <div className="grid grid-cols-2">
          <div>
            <div className="section-title">Chain</div>
            <ul style={{ marginTop: 8, display:'grid', gap: 6 }}>
              <li className="muted">Name: 0G-Galileo-Testnet</li>
              <li className="muted">RPC: {rpc}</li>
              <li className="muted">Chain ID: {chainId}</li>
              <li className="muted">Currency: OG</li>
              <li className="muted">Explorer: https://chainscan-galileo.0g.ai</li>
            </ul>
          </div>
          <div>
            <div className="section-title">Wallet & SDK</div>
            <p className="muted">Use WalletConnect with your project ID in <code>.env</code>. Configure the chain ID to <code>16602</code> and RPC to <code>evmrpc-testnet.0g.ai</code> for the Galileo testnet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}