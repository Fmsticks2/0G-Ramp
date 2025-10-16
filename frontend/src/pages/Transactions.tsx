import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getTransactionsByWallet } from '../lib/api'

export default function Transactions() {
  const { address } = useAccount()
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!address) return
      setLoading(true)
      try {
        const data = await getTransactionsByWallet(address)
        setRows(data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [address])

  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="section-title">Transaction History</div>
      {loading && <p className="muted">Loading...</p>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>TxHash</th>
              <th>0G CID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.type}</td>
                <td>{r.amount}</td>
                <td>{r.txHash || '-'}</td>
                <td>{r.storageCid || '-'}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}