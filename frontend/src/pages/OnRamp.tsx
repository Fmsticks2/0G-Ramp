import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useAccount } from 'wagmi'
import Layout from '../components/Layout'
import { createOnrampSession, simulateWebhook } from '../lib/api'

export default function OnRamp() {
  const { address } = useAccount()
  const [fiatAmount, setFiatAmount] = useState('100')
  const [currency, setCurrency] = useState('USD')
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const startOnramp = async () => {
    if (!address) return setMessage('Connect wallet first.')
    setLoading(true)
    setMessage(null)
    try {
      const res = await createOnrampSession({ 
        walletAddress: address, 
        fiatAmount: Number(fiatAmount), 
        currency 
      })
      setSessionId(res.sessionId)
      setPaymentUrl(res.paymentUrl)
      setMessage('Payment session created successfully.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const completePayment = async () => {
    if (!sessionId) return
    setLoading(true)
    try {
      await simulateWebhook(sessionId, 'success')
      setMessage('Payment confirmed. USDC transfer completed.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSessionId(null)
    setPaymentUrl(null)
    setMessage(null)
    setFiatAmount('100')
    setCurrency('USD')
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-6">
              <Icon icon="mdi:bank-transfer-in" className="text-3xl text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              On-Ramp Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Convert your fiat currency to USDC seamlessly. Fast, secure, and transparent transactions on the 0G Network.
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
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:currency-usd" className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Purchase USDC
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Amount to Purchase
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={fiatAmount}
                        onChange={(e) => setFiatAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter amount"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                          {currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Currency Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="USD">🇺🇸 US Dollar (USD)</option>
                      <option value="EUR">🇪🇺 Euro (EUR)</option>
                      <option value="GBP">🇬🇧 British Pound (GBP)</option>
                    </select>
                  </div>

                  {/* Conversion Preview */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">You pay:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {fiatAmount} {currency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600 dark:text-gray-400">You receive:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ≈ {fiatAmount} USDC
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-gray-500 dark:text-gray-400">Exchange rate:</span>
                      <span className="text-gray-500 dark:text-gray-400">1 {currency} = 1 USDC</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startOnramp}
                    disabled={loading || !address}
                    className="w-full inline-flex items-center justify-center gap-2 btn-ghost-accent btn-ghost-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Icon icon="mdi:loading" className="animate-spin" />
                        Creating Session...
                      </>
                    ) : !address ? (
                      <>
                        <Icon icon="mdi:wallet-outline" />
                        Connect Wallet First
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:credit-card" />
                        Create Payment Session
                      </>
                    )}
                  </motion.button>

                  {/* Reset Button */}
                  {(sessionId || message) && (
                    <motion.button
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      onClick={resetForm}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:refresh" />
                      Start New Transaction
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
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:wallet" className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Wallet Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Connection:</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${address ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                      <span className="text-sm font-medium text-white">
                        {address ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                  {address && (
                    <div className="text-xs text-gray-400 font-mono break-all">
                      {address}
                    </div>
                  )}
                </div>
              </div>

              {/* Payment URL */}
              {paymentUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:link" className="text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Payment Ready
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Complete your payment using the secure payment link below:
                  </p>
                  <div className="space-y-3">
                    <a
                      href={paymentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      <Icon icon="mdi:open-in-new" />
                      Open Payment Page
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={completePayment}
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 btn-ghost-accent btn-ghost-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Icon icon="mdi:loading" className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:check-circle" />
                          Simulate Success
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Status Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl shadow-sm border p-6 ${
                    message.includes('confirmed') || message.includes('created')
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                      : message.includes('Error') || message.includes('Connect')
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      icon={
                        message.includes('confirmed') || message.includes('created')
                          ? "mdi:check-circle"
                          : message.includes('Error') || message.includes('Connect')
                          ? "mdi:alert-circle"
                          : "mdi:information"
                      }
                      className={`text-xl mt-0.5 ${
                        message.includes('confirmed') || message.includes('created')
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : message.includes('Error') || message.includes('Connect')
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    />
                    <div>
                      <h4 className={`font-medium mb-1 ${
                        message.includes('confirmed') || message.includes('created')
                          ? 'text-emerald-900 dark:text-emerald-100'
                          : message.includes('Error') || message.includes('Connect')
                          ? 'text-red-900 dark:text-red-100'
                          : 'text-blue-900 dark:text-blue-100'
                      }`}>
                        {message.includes('confirmed') ? 'Success' : 
                         message.includes('created') ? 'Session Created' :
                         message.includes('Error') || message.includes('Connect') ? 'Action Required' : 'Information'}
                      </h4>
                      <p className={`text-sm ${
                        message.includes('confirmed') || message.includes('created')
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : message.includes('Error') || message.includes('Connect')
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-blue-700 dark:text-blue-300'
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
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">1</span>
                    </div>
                    <p>Enter the amount you want to convert to USDC</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">2</span>
                    </div>
                    <p>Create a secure payment session</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">3</span>
                    </div>
                    <p>Complete payment through our secure provider</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">4</span>
                    </div>
                    <p>Receive USDC directly in your connected wallet</p>
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