import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Layout from '../components/Layout'
import OnRampWidget from '../components/OnRampWidget'
import OffRampWidget from '../components/OffRampWidget'
import ContractInfo from '../components/ContractInfo'

export default function Dashboard() {
  const stats = [
    { label: 'Total Volume', value: '$2.4M', icon: 'mdi:chart-line', change: '+12.5%' },
    { label: 'Active Users', value: '1,247', icon: 'mdi:account-group', change: '+8.2%' },
    { label: 'Transactions', value: '5,832', icon: 'mdi:swap-horizontal', change: '+15.3%' },
    { label: 'Success Rate', value: '99.8%', icon: 'mdi:check-circle', change: '+0.2%' }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/3 via-transparent to-pink-600/3" />
        </div>

        {/* Floating Elements - Reduced */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-pink-500/5 rounded-full blur-2xl animate-float" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-pink-400/5 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-600/5 rounded-full blur-2xl animate-float" />

        <div className="relative z-10 p-4 space-y-6">
          {/* Hero Section - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                0G-Ramp
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Your gateway to seamless crypto-fiat conversions on the 0G network
            </p>
          </motion.div>

          {/* Statistics Overview - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-pink-600/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-lg border border-pink-500/20 bg-black/60 backdrop-blur-sm p-4 hover:border-pink-400/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                      <Icon icon={stat.icon} className="text-lg text-white" />
                    </div>
                    <span className="text-pink-400 text-xs font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Widgets - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6"
          >
            <OnRampWidget />
            <OffRampWidget />
          </motion.div>

          {/* Contract Information - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <ContractInfo />
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}