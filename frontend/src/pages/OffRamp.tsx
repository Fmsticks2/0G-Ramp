import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useAccount } from 'wagmi'
import Layout from '../components/Layout'
import { requestOfframp } from '../lib/api'

export default function OffRamp() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('100')
  const [payoutMethod, setPayoutMethod] = useState('bank')
  const [depositRef, setDepositRef] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const request = async () => {
    if (!address) return setMessage('Connect wallet first.')
    setLoading(true)
    setMessage(null)
    try {
      const res = await requestOfframp({ 
        walletAddress: address, 
        amount: Number(amount), 
        payoutMethod 
      })
      setDepositRef(res.depositRef)
      setMessage('Off-ramp request created successfully.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setDepositRef(null)
    setMessage(null)
    setAmount('100')
    setPayoutMethod('bank')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
              <Icon icon="mdi:bank-transfer-out" className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Off-Ramp Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Convert your USDC to fiat currency. Secure withdrawals directly to your bank account or mobile wallet.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transaction Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:currency-usd" className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Withdraw USDC
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Amount to Withdraw
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter USDC amount"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                          USDC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payout Method Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payout Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPayoutMethod('bank')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          payoutMethod === 'bank'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            payoutMethod === 'bank'
                              ? 'bg-blue-100 dark:bg-blue-800'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <Icon 
                              icon="mdi:bank" 
                              className={`text-xl ${
                                payoutMethod === 'bank'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            />
                          </div>
                          <div className="text-left">
                            <h3 className={`font-medium ${
                              payoutMethod === 'bank'
                                ? 'text-blue-900 dark:text-blue-100'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              Bank Transfer
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Direct to bank account
                            </p>
                          </div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPayoutMethod('mobile')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          payoutMethod === 'mobile'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            payoutMethod === 'mobile'
                              ? 'bg-blue-100 dark:bg-blue-800'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <Icon 
                              icon="mdi:cellphone" 
                              className={`text-xl ${
                                payoutMethod === 'mobile'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            />
                          </div>
                          <div className="text-left">
                            <h3 className={`font-medium ${
                              payoutMethod === 'mobile'
                                ? 'text-blue-900 dark:text-blue-100'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              Mobile Money
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Mobile wallet transfer
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Conversion Preview */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">You send:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {amount} USDC
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600 dark:text-gray-400">You receive:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ≈ ${amount} USD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-gray-500 dark:text-gray-400">Processing fee:</span>
                      <span className="text-gray-500 dark:text-gray-400">0.5%</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={request}
                    disabled={loading || !address}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Icon icon="mdi:loading" className="animate-spin" />
                        Creating Request...
                      </>
                    ) : !address ? (
                      <>
                        <Icon icon="mdi:wallet-outline" />
                        Connect Wallet First
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:send" />
                        Request Withdrawal
                      </>
                    )}
                  </motion.button>

                  {/* Reset Button */}
                  {(depositRef || message) && (
                    <motion.button
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      onClick={resetForm}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:refresh" />
                      Start New Withdrawal
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Status Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Connection Status */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:wallet" className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Wallet Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Connection:</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${address ? 'bg-blue-500' : 'bg-gray-400'}`} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {address ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                  {address && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">
                      {address}
                    </div>
                  )}
                </div>
              </div>

              {/* Deposit Reference */}
              {depositRef && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:receipt" className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Deposit Reference
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Use this reference when sending USDC to the vault:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-900 dark:text-white break-all">
                          {depositRef}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(depositRef)}
                          className="ml-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                          <Icon icon="mdi:content-copy" className="text-sm" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <p className="mb-2">
                        <strong>Important:</strong> Include this reference in your USDC transfer to ensure proper processing.
                      </p>
                      <p>
                        Send exactly <strong>{amount} USDC</strong> to the vault address with this memo.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Status Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl shadow-sm border p-6 ${
                    message.includes('created') || message.includes('success')
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : message.includes('Error') || message.includes('Connect')
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      icon={
                        message.includes('created') || message.includes('success')
                          ? "mdi:check-circle"
                          : message.includes('Error') || message.includes('Connect')
                          ? "mdi:alert-circle"
                          : "mdi:information"
                      }
                      className={`text-xl mt-0.5 ${
                        message.includes('created') || message.includes('success')
                          ? 'text-blue-600 dark:text-blue-400'
                          : message.includes('Error') || message.includes('Connect')
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`}
                    />
                    <div>
                      <h4 className={`font-medium mb-1 ${
                        message.includes('created') || message.includes('success')
                          ? 'text-blue-900 dark:text-blue-100'
                          : message.includes('Error') || message.includes('Connect')
                          ? 'text-red-900 dark:text-red-100'
                          : 'text-yellow-900 dark:text-yellow-100'
                      }`}>
                        {message.includes('created') ? 'Request Created' : 
                         message.includes('Error') || message.includes('Connect') ? 'Action Required' : 'Information'}
                      </h4>
                      <p className={`text-sm ${
                        message.includes('created') || message.includes('success')
                          ? 'text-blue-700 dark:text-blue-300'
                          : message.includes('Error') || message.includes('Connect')
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Information Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:information" className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    How it Works
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <p>Enter the USDC amount you want to withdraw</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
                    </div>
                    <p>Choose your preferred payout method</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3</span>
                    </div>
                    <p>Send USDC to the vault with the provided reference</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">4</span>
                    </div>
                    <p>Receive fiat currency in your chosen account</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}