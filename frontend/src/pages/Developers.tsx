import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Layout from '../components/Layout'
import { getApiKey, generateApiKey } from '../lib/api'
import { useAccount } from 'wagmi'

export default function Developers() {
  const { address } = useAccount()
  const [apiKey, setApiKey] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string>('')

  useEffect(() => {
    if (address) {
      fetchApiKey()
    }
  }, [address])

  const fetchApiKey = async () => {
    try {
      const key = await getApiKey(address!)
      setApiKey(key.apiKey || '')
    } catch (error) {
      console.error('Failed to fetch API key:', error)
    }
  }

  const handleGenerateKey = async () => {
    setLoading(true)
    try {
      const newKey = await generateApiKey(address!)
      setApiKey(newKey.apiKey)
    } catch (error) {
      console.error('Failed to generate API key:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const codeExamples = useMemo(() => ({
    node: `const axios = require('axios');

const response = await axios.post('https://api.0g-ramp.com/onramp', {
  amount: 100,
  currency: 'USD',
  walletAddress: '0x...'
}, {
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

response = requests.post('https://api.0g-ramp.com/onramp', 
  json={
    'amount': 100,
    'currency': 'USD',
    'walletAddress': '0x...'
  },
  headers={
    'Authorization': f'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
)

print(response.json())`,
    curl: `curl -X POST https://api.0g-ramp.com/onramp \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100,
    "currency": "USD",
    "walletAddress": "0x..."
  }'`
  }), [apiKey])

  const features = [
    {
      icon: 'mdi:api',
      title: 'RESTful API',
      description: 'Simple and intuitive REST endpoints for all operations'
    },
    {
      icon: 'mdi:shield-check',
      title: 'Secure Authentication',
      description: 'API key-based authentication with rate limiting'
    },
    {
      icon: 'mdi:lightning-bolt',
      title: 'Real-time Updates',
      description: 'WebSocket support for live transaction updates'
    },
    {
      icon: 'mdi:code-json',
      title: 'JSON Responses',
      description: 'Consistent JSON format for all API responses'
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Floating Elements - Reduced */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-black/20 backdrop-blur-xl rounded-full blur-2xl border border-white/20 animate-float" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-black/20 backdrop-blur-xl rounded-lg blur-xl border border-white/20 animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-black/20 backdrop-blur-xl rounded-full blur-2xl border border-white/20 animate-float" />

        <div className="relative z-10 p-4 space-y-6">
          {/* Hero Section - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Developer{' '}
              <span className="text-white">
                API
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Integrate 0G-Ramp into your applications with our powerful API
            </p>
          </motion.div>

          {/* Features Overview - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-black/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-lg border border-white/20 bg-black/60 backdrop-blur-sm p-4 hover:border-white/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-xl flex items-center justify-center mb-3 border border-white/20">
                    <Icon icon={feature.icon} className="text-lg text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* API Key Management - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-black/10 rounded-xl blur-sm opacity-50" />
              <div className="relative rounded-xl border border-white/20 bg-black/60 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-black/50 backdrop-blur-xl flex items-center justify-center border border-white/20">
                    <Icon icon="mdi:key" className="text-sm text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-white">API Key Management</h2>
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium">Live</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Your API Key
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={apiKey || 'No API key generated'}
                          readOnly
                          className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(apiKey, 'apikey')}
                        className="px-3 py-2 bg-black/30 backdrop-blur-xl text-white rounded-lg hover:bg-black/40 transition-all duration-200 flex items-center gap-1 border border-white/20"
                      >
                        <Icon icon={copied === 'apikey' ? 'mdi:check' : 'mdi:content-copy'} className="text-sm" />
                      </motion.button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateKey}
                    disabled={loading || !address}
                    className="w-full py-2 bg-black/30 backdrop-blur-xl text-white rounded-lg hover:bg-black/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-white/20"
                  >
                    {loading ? (
                      <>
                        <Icon icon="mdi:loading" className="text-sm animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:refresh" className="text-sm" />
                        {apiKey ? 'Regenerate API Key' : 'Generate API Key'}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Examples - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Code Examples</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(codeExamples).map(([lang, code]) => (
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * Object.keys(codeExamples).indexOf(lang) }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-black/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative rounded-lg border border-white/20 bg-black/60 backdrop-blur-sm overflow-hidden">
                    <div className="flex items-center justify-between p-3 border-b border-white/20">
                      <div className="flex items-center gap-2">
                        <Icon 
                          icon={lang === 'node' ? 'mdi:nodejs' : lang === 'python' ? 'mdi:language-python' : 'mdi:console'} 
                          className="text-sm text-white" 
                        />
                        <span className="text-white font-medium text-sm capitalize">{lang === 'node' ? 'Node.js' : lang}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(code, lang)}
                        className="p-1 text-white hover:text-gray-300 transition-colors bg-black/30 backdrop-blur-xl rounded border border-white/20 hover:bg-black/40"
                      >
                        <Icon icon={copied === lang ? 'mdi:check' : 'mdi:content-copy'} className="text-sm" />
                      </motion.button>
                    </div>
                    <pre className="p-3 text-xs text-gray-300 overflow-x-auto max-h-48">
                      <code>{code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}