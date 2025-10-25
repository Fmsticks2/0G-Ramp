import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import KYCModal from './KYCModal'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [kycOpen, setKycOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient bg-grid text-white flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${sidebarCollapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col border-r border-base-600/50 backdrop-blur-xl bg-base-900/30 transition-all duration-300 relative z-10`}
      >
        <div className="p-4">
          <motion.div 
            className="flex items-center gap-2 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Icon icon="mdi:bridge" className="text-accent text-2xl" />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md" />
            </div>
            {!sidebarCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent"
              >
                0G-Ramp
              </motion.span>
            )}
          </motion.div>
          
          <nav className="flex flex-col gap-2">
            <NavItem to="/" icon="mdi:home" label="Home" active={pathname === '/'} collapsed={sidebarCollapsed} />
            <NavItem to="/dashboard" icon="mdi:view-dashboard" label="Dashboard" active={pathname === '/dashboard'} collapsed={sidebarCollapsed} />
            <NavItem to="/onramp" icon="mdi:bank-transfer-in" label="On-Ramp" active={pathname === '/onramp'} collapsed={sidebarCollapsed} />
            <NavItem to="/offramp" icon="mdi:bank-transfer-out" label="Off-Ramp" active={pathname === '/offramp'} collapsed={sidebarCollapsed} />
            <NavItem to="/transactions" icon="mdi:clipboard-text" label="Transactions" active={pathname === '/transactions'} collapsed={sidebarCollapsed} />
            <NavItem to="/developers" icon="mdi:code-tags" label="Developers" active={pathname === '/developers'} collapsed={sidebarCollapsed} />
          </nav>
        </div>
        
        <div className="mt-auto p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl bg-base-800/50 hover:bg-base-700/50 border border-base-600/50 hover:border-base-500/50 transition-all duration-300 mb-4"
          >
            <Icon icon={sidebarCollapsed ? "mdi:chevron-right" : "mdi:chevron-left"} className="text-xl text-accent" />
          </motion.button>
          
          {!sidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-400 text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
              <div>Professional • Secure • 0G</div>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between px-6 py-4 border-b border-base-600/50 backdrop-blur-xl bg-base-900/20"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Icon icon="mdi:lightning-bolt" className="text-accent text-xl" />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md" />
            </motion.div>
            <span className="font-medium bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              RampFlow
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setKycOpen(true)} 
              className="px-4 py-2 rounded-xl bg-base-800/50 hover:bg-base-700/50 border border-base-600/50 hover:border-base-500/50 backdrop-blur-sm flex items-center gap-2 transition-all duration-300 group"
            >
              <Icon icon="mdi:account-check" className="group-hover:text-accent transition-colors" />
              <span>KYC</span>
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <ConnectButton />
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 p-6 relative"
        >
          {children}
        </motion.main>
      </div>

      {/* KYC Modal */}
      <KYCModal open={kycOpen} onClose={() => setKycOpen(false)} />
    </div>
  )
}

function NavItem({ to, icon, label, active, collapsed }: { 
  to: string; 
  icon: string; 
  label: string; 
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        to={to} 
        className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 relative group ${
          active 
            ? 'bg-gradient-to-r from-accent/20 to-purple-500/20 text-white border border-accent/30' 
            : 'text-gray-300 hover:bg-base-700/50 hover:text-white border border-transparent hover:border-base-600/50'
        }`}
      >
        {active && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-xl"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        
        <div className="relative z-10 flex items-center gap-3 w-full">
          <Icon 
            icon={icon} 
            className={`text-xl transition-colors ${active ? 'text-accent' : 'group-hover:text-accent'}`} 
          />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-medium"
            >
              {label}
            </motion.span>
          )}
        </div>
        
        {active && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 w-2 h-2 bg-accent rounded-full"
          />
        )}
      </Link>
    </motion.div>
  )
}