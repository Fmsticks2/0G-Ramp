import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import KYCModal from './KYCModal'

export default function Header() {
  const [kycOpen, setKycOpen] = useState(false)

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-between px-6 py-4 bg-gray-800 rounded-2xl m-4 border border-gray-600"
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Icon icon="mdi:lightning-bolt" className="text-pink-400 text-xl" />
            <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-md" />
          </motion.div>
          <span className="font-medium bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">
            RampFlow
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setKycOpen(true)} 
            className="btn-ghost-accent gap-2 group"
          >
            <Icon icon="mdi:account-check" className="group-hover:text-pink-400 transition-colors" />
            <span>KYC</span>
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <ConnectButton />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* KYC Modal */}
      <KYCModal open={kycOpen} onClose={() => setKycOpen(false)} />
    </>
  )
}