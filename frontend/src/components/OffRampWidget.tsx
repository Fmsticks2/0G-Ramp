import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useAccount } from 'wagmi'
import { requestOfframp } from '../lib/api'

export default function OffRampWidget() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('50')
  const [payoutMethod, setPayoutMethod] = useState('bank')
  const [depositRef, setDepositRef] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const request = async () => {
    if (!address) return setMessage('Connect wallet first.')
    setLoading(true)
    setMessage(null)
    try {
      const res = await requestOfframp({ walletAddress: address, amount: Number(amount), payoutMethod })
      setDepositRef(res.depositRef)
      setMessage('Off-ramp request created. Send USDC to vault with memo if required.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative rounded-2xl border border-base-600/50 bg-base-800/50 backdrop-blur-md p-6 hover:border-blue-500/30 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:bank-transfer" className="text-2xl text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-xl blur-md" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Off-Ramp</h2>
              <p className="text-sm text-gray-400">Convert crypto to fiat</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Amount (USDC)</label>
              <div className="relative">
                <input 
                  className="w-full rounded-xl bg-base-900/50 border border-base-600/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300" 
                  type="number" 
                  min={1} 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="Enter USDC amount" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 to-purple-500/5 pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Payout Method</label>
              <div className="relative">
                <select 
                  className="w-full rounded-xl bg-base-900/50 border border-base-600/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 appearance-none cursor-pointer" 
                  value={payoutMethod} 
                  onChange={(e) => setPayoutMethod(e.target.value)}
                >
                  <option value="bank">🏦 Bank Transfer</option>
                  <option value="mobile">📱 Mobile Money</option>
                </select>
                <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
            onClick={request} 
            disabled={loading || !address}
          >
            {loading ? (
              <>
                <Icon icon="mdi:loading" className="mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : !address ? (
              <>
                <Icon icon="mdi:wallet-outline" className="mr-2" />
                Connect Wallet First
              </>
            ) : (
              <>
                <Icon icon="mdi:send" className="mr-2" />
                Request Payout
              </>
            )}
          </motion.button>
        </div>

        {/* Deposit Reference */}
        {depositRef && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-xl bg-base-900/30 border border-base-600/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:receipt" className="text-blue-400" />
              <span className="text-sm font-medium text-white">Deposit Reference</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-mono text-sm flex-1 break-all">{depositRef}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigator.clipboard.writeText(depositRef)}
                className="p-2 rounded-lg bg-base-800/50 hover:bg-base-700/50 text-gray-400 hover:text-white transition-colors"
              >
                <Icon icon="mdi:content-copy" />
              </motion.button>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Use this reference when sending USDC to the vault
            </div>
          </motion.div>
        )}

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-xl border text-sm ${
              message.includes('created') || message.includes('success')
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                : message.includes('Error') || message.includes('Connect')
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon 
                icon={
                  message.includes('created') || message.includes('success')
                    ? "mdi:check-circle"
                    : message.includes('Error') || message.includes('Connect')
                    ? "mdi:alert-circle"
                    : "mdi:information"
                } 
              />
              <span>{message}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}