import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo">Velora</Link>
      </div>
      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/developers">Developers</Link>
      </nav>
      <div className="header-right">
        <ConnectButton />
      </div>
    </header>
  )
}