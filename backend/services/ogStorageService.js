exports.storeReceipt = async (json) => {
  // Placeholder for 0G Storage upload; returns mock CID
  const base = Buffer.from(JSON.stringify(json)).toString('base64').slice(0, 16)
  return `cid_${base}`
}