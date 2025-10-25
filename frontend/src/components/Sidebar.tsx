import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${collapsed ? 'w-20' : 'w-64'} flex flex-col backdrop-blur-xl bg-black/20 transition-all duration-300 relative rounded-none md:rounded-r-2xl border border-white/10 h-full overflow-y-auto`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Icon icon="mdi:bridge" className="text-white text-2xl" />
              <div className="absolute inset-0 bg-white/10 rounded-full blur-md" />
            </div>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-white"
              >
                0G-Ramp
              </motion.span>
            )}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="flex items-center justify-center p-2 rounded-xl bg-black/50 hover:bg-black/70 border border-white/20 hover:border-white/30 transition-all duration-300"
          >
            <Icon icon={collapsed ? "mdi:chevron-right" : "mdi:chevron-left"} className="text-xl text-white" />
          </motion.button>
        </div>
        
        <nav className="flex flex-col gap-2">
          <NavItem to="/" icon="mdi:home" label="Home" active={pathname === '/'} collapsed={collapsed} />
          <NavItem to="/dashboard" icon="mdi:view-dashboard" label="Dashboard" active={pathname === '/dashboard'} collapsed={collapsed} />
          <NavItem to="/onramp" icon="mdi:bank-transfer-in" label="On-Ramp" active={pathname === '/onramp'} collapsed={collapsed} />
          <NavItem to="/offramp" icon="mdi:bank-transfer-out" label="Off-Ramp" active={pathname === '/offramp'} collapsed={collapsed} />
          <NavItem to="/transactions" icon="mdi:clipboard-text" label="Transactions" active={pathname === '/transactions'} collapsed={collapsed} />
          <NavItem to="/developers" icon="mdi:code-braces" label="Developers" active={pathname === '/developers'} collapsed={collapsed} />
        </nav>
      </div>
      
      {!collapsed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400 text-center p-4 mt-4"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
          <div>Professional • Secure • 0G</div>
        </motion.div>
      )}
    </motion.aside>
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
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden
          ${active 
            ? 'bg-black/30 backdrop-blur-sm border border-white/20 text-white' 
            : 'hover:bg-black/20 hover:border-white/10 border border-transparent text-gray-300 hover:text-white'
          }
        `}
      >
        <div className="relative z-10 flex items-center gap-3">
          <Icon icon={icon} className={`text-lg ${active ? 'text-white' : 'group-hover:text-white'}`} />
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium"
            >
              {label}
            </motion.span>
          )}
        </div>
        
        {active && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>
    </Link>
  )
}