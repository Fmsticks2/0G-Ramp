import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Icon } from '@iconify/react'

export default function Landing() {
  // Removed unused scrollY state
  // const [scrollY, setScrollY] = useState(0)

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY)
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <Icon icon="mdi:bridge" className="text-accent text-3xl" />
            <div className="absolute inset-0 text-accent text-3xl animate-ping opacity-20">
              <Icon icon="mdi:bridge" />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            0G Ramp
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ConnectButton />
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white text-sm font-medium">
              <Icon icon="mdi:lightning-bolt" className="text-lg" />
              Powered by 0G Network
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Seamless
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Fiat ↔ Crypto
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Bridge
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Experience the future of decentralized finance with our professional, 
            secure, and lightning-fast fiat-to-stablecoin bridge built on the 
            revolutionary 0G Network infrastructure.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link 
              to="/dashboard" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl bg-black/30 backdrop-blur-xl hover:bg-black/40 text-white shadow-2xl shadow-black/25 transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <Icon icon="mdi:rocket-launch" className="mr-3 text-xl group-hover:animate-bounce" />
              Start Trading
              <div className="absolute inset-0 rounded-2xl bg-black/20 blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
            </Link>
            
            <Link 
              to="/developers" 
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl bg-black/20 backdrop-blur-xl hover:bg-black/30 text-white border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              <Icon icon="mdi:code-tags" className="mr-3 text-xl group-hover:rotate-12 transition-transform" />
              View API Docs
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-16 w-12 h-12 bg-black/20 backdrop-blur-xl rounded-xl border border-white/20"
        />
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose 0G Ramp?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built for the future of decentralized finance with cutting-edge technology and unmatched security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "mdi:shield-check",
                title: "Bank-Grade Security",
                description: "Multi-layer security protocols with advanced encryption and secure transaction receipts stored on 0G Network.",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: "mdi:lightning-bolt",
                title: "Lightning Fast",
                description: "Process transactions in seconds, not minutes. Built on 0G's high-performance blockchain infrastructure.",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: "mdi:currency-usd",
                title: "Low Fees",
                description: "Competitive rates with transparent pricing. No hidden fees, no surprises. Just fair, honest pricing.",
                color: "from-blue-400 to-cyan-500"
              },
              {
                icon: "mdi:api",
                title: "Developer Friendly",
                description: "Comprehensive APIs and SDKs for seamless integration. Build the future of finance with our tools.",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: "mdi:earth",
                title: "Global Access",
                description: "Available worldwide with support for multiple currencies and payment methods. Finance without borders.",
                color: "from-teal-400 to-green-500"
              },
              {
                icon: "mdi:chart-line",
                title: "Real-time Analytics",
                description: "Track your transactions with detailed analytics and insights. Make informed financial decisions.",
                color: "from-red-400 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-8 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black/50 backdrop-blur-xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <Icon icon={feature.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 rounded-3xl bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6 lg:px-12 bg-black/10 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simple, secure, and straightforward. Get started in just three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                description: "Connect your Web3 wallet securely using RainbowKit. Support for MetaMask, WalletConnect, and more.",
                icon: "mdi:wallet"
              },
              {
                step: "02", 
                title: "Choose Amount",
                description: "Select your desired amount and currency. Our smart contracts handle the rest with transparent pricing.",
                icon: "mdi:currency-usd"
              },
              {
                step: "03",
                title: "Complete Transaction",
                description: "Confirm your transaction and receive your funds instantly. All receipts are stored securely on 0G Network.",
                icon: "mdi:check-circle"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-accent to-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={step.icon} className="text-3xl text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-base-900 border-2 border-accent flex items-center justify-center text-xs font-bold text-accent">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$50M+", label: "Total Volume", icon: "mdi:chart-line" },
              { value: "10K+", label: "Active Users", icon: "mdi:account-group" },
              { value: "99.9%", label: "Uptime", icon: "mdi:server" },
              { value: "<2s", label: "Avg. Speed", icon: "mdi:speedometer" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black/30 backdrop-blur-xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <Icon icon={stat.icon} className="text-2xl text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 lg:px-12 bg-black/10 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of users who trust 0G Ramp for their fiat-to-crypto needs. 
            Experience the future of decentralized finance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/dashboard" 
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl bg-black/30 backdrop-blur-xl hover:bg-black/40 text-white shadow-2xl shadow-black/25 transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <Icon icon="mdi:rocket-launch" className="mr-3 text-xl group-hover:animate-bounce" />
              Launch App
            </Link>
            <Link 
              to="/transactions" 
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl bg-black/20 backdrop-blur-xl hover:bg-black/30 text-white border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <Icon icon="mdi:clipboard-text" className="mr-3 text-xl" />
              View Transactions
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Icon icon="mdi:bridge" className="text-accent text-3xl" />
                <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  0G Ramp
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The future of decentralized finance. Seamless, secure, and lightning-fast 
                fiat-to-crypto bridge built on 0G Network.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "mdi:twitter", href: "#" },
                  { icon: "mdi:discord", href: "#" },
                  { icon: "mdi:telegram", href: "#" },
                  { icon: "mdi:github", href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/20 backdrop-blur-xl hover:bg-black/30 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 border border-white/20"
                  >
                    <Icon icon={social.icon} className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {["Dashboard", "Transactions", "API Docs", "Support"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 0G Ramp. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}