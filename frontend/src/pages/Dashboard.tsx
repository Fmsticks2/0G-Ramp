import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-black/30 backdrop-blur-xl rounded-3xl mb-6 shadow-2xl shadow-black/25 border border-white/10">
              <Icon icon="mdi:swap-horizontal-bold" className="text-5xl text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              OG-Ramp Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your gateway to seamless fiat-to-crypto and crypto-to-fiat transactions. 
              Choose your service below to get started.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Icon icon="mdi:trending-up" className="text-3xl text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Volume</p>
                  <p className="text-3xl font-bold text-white">$2.4M</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                  <Icon icon="mdi:check-circle" className="text-3xl text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Transactions</p>
                  <p className="text-3xl font-bold text-white">1,247</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-400/30">
                  <Icon icon="mdi:account-group" className="text-3xl text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-3xl font-bold text-white">892</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-orange-400/30">
                  <Icon icon="mdi:clock-outline" className="text-3xl text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg. Time</p>
                  <p className="text-3xl font-bold text-white">2.3m</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* OnRamp Card */}
            <Link to="/onramp">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 cursor-pointer group transition-all duration-300 hover:bg-white/10 hover:border-blue-400/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-18 h-18 bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/25 border border-white/10">
                    <Icon icon="mdi:bank-transfer-in" className="text-4xl text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm font-medium">Get Started</span>
                    <Icon icon="mdi:arrow-right" className="text-lg" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  On-Ramp Service
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Convert your fiat currency (USD, EUR) to USDC seamlessly. 
                  Fast, secure, and reliable crypto purchases with competitive rates.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30">
                      <Icon icon="mdi:check" className="text-sm text-blue-400" />
                    </div>
                    <span>Instant USDC delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30">
                      <Icon icon="mdi:check" className="text-sm text-blue-400" />
                    </div>
                    <span>Multiple fiat currencies supported</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30">
                      <Icon icon="mdi:check" className="text-sm text-blue-400" />
                    </div>
                    <span>Competitive exchange rates</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* OffRamp Card */}
            <Link to="/offramp">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 cursor-pointer group transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-18 h-18 bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/25 border border-white/10">
                    <Icon icon="mdi:bank-transfer-out" className="text-4xl text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm font-medium">Get Started</span>
                    <Icon icon="mdi:arrow-right" className="text-lg" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  Off-Ramp Service
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Convert your USDC to fiat currency with ease. 
                  Withdraw directly to your bank account or mobile wallet.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-400/30">
                      <Icon icon="mdi:check" className="text-sm text-purple-400" />
                    </div>
                    <span>Direct bank transfers</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-400/30">
                      <Icon icon="mdi:check" className="text-sm text-purple-400" />
                    </div>
                    <span>Mobile money support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-400/30">
                      <Icon icon="mdi:check" className="text-sm text-purple-400" />
                    </div>
                    <span>Fast processing times</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-12 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg shadow-black/25 border border-white/10">
                <Icon icon="mdi:lightning-bolt" className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Quick Actions
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/transactions">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                >
                  <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-400/30">
                    <Icon icon="mdi:history" className="text-xl text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">View History</h3>
                    <p className="text-sm text-gray-400">Check transaction history</p>
                  </div>
                </motion.div>
              </Link>
              
              <Link to="/developers">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                >
                  <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-green-400/30">
                    <Icon icon="mdi:code-braces" className="text-xl text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">API Docs</h3>
                    <p className="text-sm text-gray-400">Developer resources</p>
                  </div>
                </motion.div>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              >
                <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-purple-400/30">
                  <Icon icon="mdi:help-circle" className="text-xl text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Support</h3>
                  <p className="text-sm text-gray-400">Get help & support</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}