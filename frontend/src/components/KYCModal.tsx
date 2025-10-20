import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { of as ipfsOnlyHashOf } from 'ipfs-only-hash'
import { submitKyc } from '../lib/api'
import { useAccount } from 'wagmi'

interface Props {
  open: boolean
  onClose: () => void
}

export default function KYCModal({ open, onClose }: Props) {
  const { address } = useAccount()
  const [file, setFile] = useState<File | null>(null)
  const [cid, setCid] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submittedCid, setSubmittedCid] = useState<string>('')
  const [error, setError] = useState<string>('')

  const canSubmit = useMemo(() => !!address && !!cid && !submitting, [address, cid, submitting])

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setSubmittedCid('')
    const f = e.target.files?.[0]
    setFile(f || null)
    if (f) {
      const buf = new Uint8Array(await f.arrayBuffer())
      try {
        const computed = await ipfsOnlyHashOf(buf, { cidVersion: 1, rawLeaves: true })
        setCid(computed)
      } catch (e: any) {
        console.error(e)
        setError('Failed to compute CID')
      }
    } else {
      setCid('')
    }
  }

  const onSubmit = async () => {
    if (!address || !cid || !file) return
    setSubmitting(true)
    setError('')
    try {
      const res = await submitKyc({ walletAddress: address, cid, mime: file.type, size: file.size })
      setSubmittedCid(res.cid)
    } catch (e: any) {
      setError(e?.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-base-900/90 border border-base-700 shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">KYC Verification</h3>
              <button className="text-base-400 hover:text-white" onClick={onClose}>✕</button>
            </div>
            <p className="text-base-300 mb-4">Upload a government ID or proof of address. We compute a local CID and store only the content address (no raw file) for verification.</p>

            <div className="space-y-3">
              <input type="file" accept="image/*,.pdf" onChange={onFileChange} className="block w-full text-sm text-base-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-500/20 file:text-accent-200 hover:file:bg-accent-500/30" />
              {file && (
                <div className="text-xs text-base-400">
                  <div>File: <span className="text-white">{file.name}</span> ({(file.size/1024/1024).toFixed(2)} MB)</div>
                </div>
              )}
              {cid && (
                <div className="text-xs text-accent-200 break-all">
                  CID: {cid}
                </div>
              )}
              {error && (
                <div className="text-sm text-red-400">{error}</div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-base-800 hover:bg-base-700">Cancel</button>
              <button onClick={onSubmit} disabled={!canSubmit} className="px-4 py-2 rounded-lg bg-accent-500 text-black font-medium hover:bg-accent-400 disabled:opacity-50">
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>

            {submittedCid && (
              <div className="mt-4 text-sm text-green-400 break-all">Stored CID: {submittedCid}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}