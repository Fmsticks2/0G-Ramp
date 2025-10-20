import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { getApiKey, generateApiKey } from '../lib/api'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'

const codeSnippets = (apiBase: string, apiKey: string) => ({
  node: `import fetch from 'node-fetch'

const API_BASE = '${apiBase}'
const headers = { 'Content-Type': 'application/json', 'x-api-key': '${apiKey || '<YOUR_API_KEY>'}' }

async function createOnramp() {
  const res = await fetch(API_BASE + '/api/onramp/create-session', {
    method: 'POST', headers, body: JSON.stringify({
      walletAddress: '0xYourWallet', fiatAmount: 100, currency: 'USD'
    })
  })
  console.log(await res.json())
}

createOnramp()` ,
  python: `import requests

API_BASE = '${apiBase}'
headers = { 'Content-Type': 'application/json', 'x-api-key': '${apiKey || '<YOUR_API_KEY>'}' }

r = requests.post(f"{API_BASE}/api/onramp/create-session", headers=headers, json={
  'walletAddress': '0xYourWallet', 'fiatAmount': 100, 'currency': 'USD'
})
print(r.json())`,
  curl: `curl -X POST ${apiBase}/api/onramp/create-session \\
  -H 'Content-Type: application/json' \\
  -H 'x-api-key: ${apiKey || '<YOUR_API_KEY>'}' \\
  -d '{"walletAddress":"0xYourWallet","fiatAmount":100,"currency":"USD"}'`
})

export default function Developers() {
  const { address } = useAccount()
  const [apiKey, setApiKey] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'node'|'python'|'curl'>('node')

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3001'
  const snippets = useMemo(() => codeSnippets(apiBase, apiKey), [apiBase, apiKey])

  useEffect(() => {
    const run = async () => {
      if (!address) return
      setLoading(true)
      try {
        const res = await getApiKey(address)
        setApiKey(res.apiKey || '')
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [address])

  const onGenerate = async () => {
    if (!address) return
    setLoading(true)
    try {
      const res = await generateApiKey(address)
      setApiKey(res.apiKey)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Developers</h1>
        <p className="text-base-300 mb-6">Manage API keys and explore examples to integrate on/off-ramp flows.</p>

        <motion.div className="rounded-2xl border border-base-700 bg-base-900/60 p-5 mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-base-400">Your API Key</div>
              <div className="font-mono text-accent-200 break-all select-all">{apiKey || (loading ? 'Loading…' : 'Not generated')}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigator.clipboard.writeText(apiKey)} disabled={!apiKey} className="px-3 py-2 rounded-lg bg-base-800 hover:bg-base-700 disabled:opacity-50">Copy</button>
              <button onClick={onGenerate} disabled={!address || loading} className="px-3 py-2 rounded-lg bg-accent-500 text-black hover:bg-accent-400 disabled:opacity-50">{apiKey ? 'Regenerate' : 'Generate'}</button>
            </div>
          </div>
        </motion.div>

        <div className="mb-3 flex items-center gap-2">
          <button className={`px-3 py-1.5 rounded-lg ${tab==='node'?'bg-accent-500 text-black':'bg-base-800 hover:bg-base-700'}`} onClick={()=>setTab('node')}>Node</button>
          <button className={`px-3 py-1.5 rounded-lg ${tab==='python'?'bg-accent-500 text-black':'bg-base-800 hover:bg-base-700'}`} onClick={()=>setTab('python')}>Python</button>
          <button className={`px-3 py-1.5 rounded-lg ${tab==='curl'?'bg-accent-500 text-black':'bg-base-800 hover:bg-base-700'}`} onClick={()=>setTab('curl')}>cURL</button>
        </div>

        <div className="rounded-2xl border border-base-700 bg-base-900/60 p-0 overflow-hidden">
          <div className="bg-base-800/70 px-4 py-2 text-sm text-base-300">Create On-Ramp Session</div>
          <pre className="p-4 text-sm overflow-auto"><code>{snippets[tab]}</code></pre>
        </div>

        <div className="mt-6 text-sm text-base-400">Include header <span className="font-mono text-base-200">x-api-key</span> with your requests. You can rotate keys anytime.</div>
      </div>
    </Layout>
  )
}