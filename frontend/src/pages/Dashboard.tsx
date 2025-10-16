import { useState } from 'react'
import { useAccount } from 'wagmi'
import BalanceCard from '../components/BalanceCard'
import OnRampWidget from '../components/OnRampWidget'
import OffRampWidget from '../components/OffRampWidget'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="grid grid-cols-2">
      <div className="card" style={{ padding: 20 }}>
        <BalanceCard address={address} isConnected={isConnected} />
      </div>
      <div className="card" style={{ padding: 20 }}>
        <OnRampWidget address={address} isConnected={isConnected} onComplete={() => setRefreshKey(refreshKey+1)} />
      </div>
      <div className="card" style={{ padding: 20 }}>
        <OffRampWidget address={address} isConnected={isConnected} onComplete={() => setRefreshKey(refreshKey+1)} />
      </div>
    </div>
  )
}