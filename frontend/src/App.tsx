import { Routes, Route, Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Developer from './pages/Developer'
import './App.css'

function App() {
  return (
    <div className="app">
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
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/developers" element={<Developer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
