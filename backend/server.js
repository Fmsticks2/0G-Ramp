require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

app.use(helmet())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(morgan('dev'))
app.use(express.json())

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 })
app.use(limiter)

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/api/onramp', require('./routes/onramp'))
app.use('/api/offramp', require('./routes/offramp'))
app.use('/api/webhook', require('./routes/webhook'))
app.use('/api/transactions', require('./routes/transactions'))

app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Velora backend listening on http://localhost:${port}`)
})