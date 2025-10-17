import { useState } from 'react'
import { useAccount } from 'wagmi'
import BalanceCard from '../components/BalanceCard'
import OnRampWidget from '../components/OnRampWidget'
import OffRampWidget from '../components/OffRampWidget'
import StatCard from '../components/StatCard'
import SectionHeader from '../components/SectionHeader'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* KPIs */}
      <div className="grid grid-cols-3">
        <StatCard title="24h Volume" value="$182,940" hint="On/Off ramp total" />
        <StatCard title="Success Rate" value="99.2%" hint="Completed vs total" />
        <StatCard title="Avg Settlement" value="14s" hint="Wallet → stored receipt" />
      </div>

      {/* Account & Balance */}
      <div className="card" style={{ padding: 20 }}>
        <SectionHeader title="Account & Balance" subtitle={address ? `${address}` : 'Connect your wallet to view balances'} />
        <BalanceCard address={address} isConnected={isConnected} />
      </div>

      {/* On-Ramp / Off-Ramp */}
      <div className="grid grid-cols-2">
        <div className="card" style={{ padding: 20 }}>
          <SectionHeader title="On-Ramp" subtitle="Buy stablecoins with fiat" />
          <OnRampWidget address={address} isConnected={isConnected} onComplete={() => setRefreshKey(refreshKey+1)} />
        </div>
        <div className="card" style={{ padding: 20 }}>
          <SectionHeader title="Off-Ramp" subtitle="Sell stablecoins to fiat" />
          <OffRampWidget address={address} isConnected={isConnected} onComplete={() => setRefreshKey(refreshKey+1)} />
        </div>
      </div>

      {/* Activity */}
      <div className="card" style={{ padding: 20 }}>
        <SectionHeader title="Recent Activity" subtitle="Last 10 operations" />
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[{ t:'2025-10-17 10:23', type:'On-Ramp', amt:'250 USDC', status:'Completed' },
              { t:'2025-10-17 09:41', type:'Off-Ramp', amt:'100 USDC', status:'Pending' },
              { t:'2025-10-17 09:12', type:'On-Ramp', amt:'50 USDC', status:'Completed' }].map((r,i) => (
                <tr key={i}>
                  <td>{r.t}</td>
                  <td>{r.type}</td>
                  <td>{r.amt}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}