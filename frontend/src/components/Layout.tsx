import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-gradient bg-grid text-white flex">
      <aside className="w-64 hidden md:flex flex-col border-r border-base-600 p-4">
        <div className="flex items-center gap-2 mb-8">
          <Icon icon="mdi:bridge" className="text-accent text-2xl" />
          <span className="font-semibold">Velora</span>
        </div>
        <nav className="flex flex-col gap-2">
          <NavItem to="/" icon="mdi:home" label="Home" active={pathname === '/'} />
          <NavItem to="/dashboard" icon="mdi:view-dashboard" label="Dashboard" active={pathname === '/dashboard'} />
          <NavItem to="/transactions" icon="mdi:clipboard-text" label="Transactions" active={pathname === '/transactions'} />
        </nav>
        <div className="mt-auto">
          <div className="text-xs text-gray-400">Dark • Professional • 0G</div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 border-b border-base-600">
          <div className="flex items-center gap-4">
            <Icon icon="mdi:lightning-bolt" className="text-accent" />
            <span className="font-medium">RampFlow</span>
          </div>
          <ConnectButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

function NavItem({ to, icon, label, active }: { to: string; icon: string; label: string; active: boolean }) {
  return (
    <Link to={to} className={`flex items-center gap-2 rounded-xl px-3 py-2 transition-colors ${active ? 'bg-base-700 text-white' : 'text-gray-300 hover:bg-base-700 hover:text-white'}`}>
      <Icon icon={icon} className="text-xl" />
      <span>{label}</span>
    </Link>
  )
}