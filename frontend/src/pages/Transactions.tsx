import { useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { getTransactionsByWallet } from '../lib/api'
import Badge from '../components/Badge'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'

function shorten(hash?: string) {
  if (!hash) return '-'
  return hash.slice(0, 6) + '...' + hash.slice(-4)
}

export default function Transactions() {
  const { address } = useAccount()
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [typeFilter, setTypeFilter] = useState<'all' | 'onramp' | 'offramp'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [search, setSearch] = useState('')

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

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesType = typeFilter === 'all' || r.type?.toLowerCase() === typeFilter
      const matchesStatus = statusFilter === 'all' || r.status?.toLowerCase() === statusFilter
      const matchesSearch = search === '' || [r.txHash, r.storageCid, r.amount, r.type].join(' ').toLowerCase().includes(search.toLowerCase())
      return matchesType && matchesStatus && matchesSearch
    })
  }, [rows, typeFilter, statusFilter, search])

  const statusVariant: (s?: string) => 'success' | 'warning' | 'error' | 'info' = (s?: string) => {
    const v = (s || '').toLowerCase()
    if (v === 'completed' || v === 'success') return 'success'
    if (v === 'pending') return 'warning'
    if (v === 'failed' || v === 'error') return 'error'
    return 'info'
  }

  return (
    <Card padded>
      <SectionHeader 
        title="Transaction History" 
        subtitle={address ? `Showing results for ${address}` : 'Connect your wallet to view transactions'}
        right={<Button variant="secondary" onClick={() => {
          const header = ['Date','Type','Amount','TxHash','0G CID','Status']
          const lines = filtered.map(r => [new Date(r.createdAt).toISOString(), r.type, r.amount, r.txHash || '', r.storageCid || '', r.status].join(','))
          const csv = [header.join(','), ...lines].join('\n')
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'transactions.csv'
          a.click()
          URL.revokeObjectURL(url)
        }}>Export CSV</Button>}
      />

      {/* Filters */}
      <div className="toolbar">
        <div className={`chip ${typeFilter==='all'?'active':''}`} onClick={()=>setTypeFilter('all')}>All</div>
        <div className={`chip ${typeFilter==='onramp'?'active':''}`} onClick={()=>setTypeFilter('onramp')}>On-Ramp</div>
        <div className={`chip ${typeFilter==='offramp'?'active':''}`} onClick={()=>setTypeFilter('offramp')}>Off-Ramp</div>
        <div className="inline ml-auto">
          <label htmlFor="search">Search</label>
          <Input id="search" placeholder="tx hash, CID, amount" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="inline">
          <label htmlFor="status">Status</label>
          <Select id="status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </Select>
        </div>
      </div>

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
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.type}</td>
                <td>{r.amount}</td>
                <td>{shorten(r.txHash)}</td>
                <td>{shorten(r.storageCid)}</td>
                <td><Badge variant={statusVariant(r.status)}>{r.status || 'Unknown'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  )
}