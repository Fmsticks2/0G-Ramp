export default function Developer() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="section-title">Developer API</div>
      <p className="muted">Copyable API keys, endpoints, and code snippets will appear here.</p>
      <div style={{ marginTop: 16 }}>
        <pre style={{ background: '#0B0B0B', padding: 16, borderRadius: 12 }}>
{`POST /api/onramp/create-session
body: { walletAddress, fiatAmount, currency }

POST /api/webhook/payment
callback: provider signature-verified

GET /api/transactions/by-wallet/:walletAddress`}
        </pre>
      </div>
    </div>
  )
}