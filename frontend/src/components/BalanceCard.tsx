type Props = { address?: string; isConnected: boolean }

export default function BalanceCard({ address, isConnected }: Props) {
  return (
    <div>
      <div className="section-title">Balance</div>
      <p className="muted">Wallet: {isConnected ? address : 'Not connected'}</p>
      <div style={{ marginTop: 12 }}>
        <div className="card" style={{ padding: 16 }}>
          <div className="muted">Bridged USDC</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>—</div>
        </div>
      </div>
    </div>
  )
}