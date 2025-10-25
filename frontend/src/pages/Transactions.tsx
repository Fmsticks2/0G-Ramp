import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Layout from '../components/Layout'
import { getTransactionsByWallet, type TxRow } from '../lib/api'
import { useAccount } from 'wagmi'

export default function Transactions() {
  const { address } = useAccount()
  const [rows, setRows] = useState<TxRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!address) return
      setLoading(true)
      setError(null)
      try {
        const data = await getTransactionsByWallet(address)
        setRows(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [address])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-300 bg-yellow-300/10'
      case 'failed': return 'text-red-500 bg-red-500/10'
      default: return 'text-white bg-white/10'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'onramp': return 'mdi:arrow-down-circle'
      case 'offramp': return 'mdi:arrow-up-circle'
      default: return 'mdi:swap-horizontal'
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-grid pointer-events-none" />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8 text-center"
      >
        <motion.h1 
          className="text-3xl lg:text-4xl font-bold mb-3 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transaction History
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Track all your on-ramp and off-ramp transactions in one place
        </motion.p>
      </motion.div>

      {/* Transaction Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { icon: "mdi:check-circle", label: "Completed", value: rows.filter(r => r.status === 'completed').length, color: "from-green-400 to-green-500" },
          { icon: "mdi:clock-outline", label: "Pending", value: rows.filter(r => r.status === 'pending').length, color: "from-yellow-300 to-yellow-400" },
          { icon: "mdi:close-circle", label: "Failed", value: rows.filter(r => r.status === 'failed').length, color: "from-red-500 to-red-600" },
          { icon: "mdi:chart-line", label: "Total", value: rows.length, color: "from-blue-400 to-blue-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity duration-300" />
            <div className="relative bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:border-white/30 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black/30 backdrop-blur-xl border border-white/20 mb-3">
                <Icon icon={stat.icon} className="text-lg text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-black/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative rounded-xl border border-white/20 bg-black/20 backdrop-blur-xl p-6 hover:border-white/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white flex items-center">
                <Icon icon="mdi:history" className="mr-2 text-white" />
                Recent Transactions
              </h2>
            {address && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-3 py-2 rounded-lg bg-black/30 hover:bg-black/40 text-white border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Icon icon="mdi:refresh" className="mr-2" />
                Refresh
              </motion.button>
            )}
          </div>

          {!address && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Icon icon="mdi:wallet-outline" className="text-5xl text-gray-500 mb-3 mx-auto" />
              <p className="text-lg text-gray-400 mb-3">Connect your wallet to view transaction history</p>
              <p className="text-sm text-gray-500">Your transactions will appear here once you connect</p>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 mb-3">
                <Icon icon="mdi:loading" className="text-2xl text-white animate-spin" />
              </div>
              <p className="text-lg text-gray-400">Loading transactions...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Icon icon="mdi:alert-circle" className="text-5xl text-white mb-3 mx-auto" />
              <p className="text-lg text-white mb-2">Error loading transactions</p>
              <p className="text-sm text-gray-500">{error}</p>
            </motion.div>
          )}

          {address && !loading && !error && rows.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Icon icon="mdi:database-outline" className="text-5xl text-gray-500 mb-3 mx-auto" />
              <p className="text-lg text-gray-400 mb-3">No transactions found</p>
              <p className="text-sm text-gray-500">Your transaction history will appear here</p>
            </motion.div>
          )}

          {rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold text-sm">Date</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold text-sm">Type</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold text-sm">Amount</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold text-sm">Transaction</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold text-sm">Storage</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, index) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-white/10 hover:bg-black/20 transition-colors duration-200"
                    >
                      <td className="py-3 px-2 text-gray-300">
                        {new Date(r.createdAt).toLocaleDateString()}
                        <div className="text-xs text-gray-500">
                          {new Date(r.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <Icon icon={getTypeIcon(r.type)} className="mr-2 text-white" />
                          <span className="capitalize text-white font-medium text-sm">{r.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-white font-semibold text-sm">{r.amount}</td>
                      <td className="py-3 px-2">
                        {r.txHash ? (
                          <a 
                            className="inline-flex items-center text-white hover:text-gray-300 transition-colors text-sm" 
                            href={`https://blockexplorer/tx/${r.txHash}`} 
                            target="_blank" 
                            rel="noreferrer"
                          >
                            {r.txHash.slice(0, 10)}…
                            <Icon icon="mdi:external-link" className="ml-1 text-xs" />
                          </a>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {r.storageCid ? (
                          <span className="text-white font-mono text-xs">
                            {r.storageCid.slice(0, 10)}…
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/4 left-10 w-12 h-12 bg-black/20 backdrop-blur-xl rounded-xl border border-white/20 pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: [0, 12, 0],
          rotate: [0, -2, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="fixed top-1/3 right-16 w-10 h-10 bg-black/20 backdrop-blur-xl rounded-lg border border-white/20 pointer-events-none"
      />
      </div>
    </Layout>
  )
}