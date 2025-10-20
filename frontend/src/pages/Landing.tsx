import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Icon } from '@iconify/react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient bg-grid">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:bridge" className="text-accent text-2xl" />
          <span className="font-semibold">Velora Ramp</span>
        </div>
        <ConnectButton />
      </header>

      <main className="px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Seamless Fiat ↔ Stablecoin Bridge on 0G Network
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-300 max-w-2xl"
        >
          Professional, futuristic dark-mode experience with animated micro-interactions and secure transaction receipts.
        </motion.p>

        <div className="mt-10 flex gap-4">
          <Link to="/dashboard" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors bg-accent hover:bg-accent-600 text-white shadow-glow">
            <Icon icon="mdi:lightning-bolt" className="mr-2" /> On-Ramp / Off-Ramp
          </Link>
          <Link to="/transactions" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors bg-base-700 hover:bg-base-600 text-white shadow-glow">
            <Icon icon="mdi:clipboard-text" className="mr-2" /> Transactions
          </Link>
        </div>
      </main>
    </div>
  )
}