import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { authMiddleware } from './middleware/authMiddleware'

// ROUTE IMPORT
import managerRoutes from './routes/managerRoutes'
import tenantRoutes from './routes/tenantRoutes'

// CONFIGURATIONS
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.get('/', (req, res) => {
  res.send('This is home route')
})

app.use('/managers', authMiddleware(['manager']), managerRoutes)
app.use('/tenants', authMiddleware(['tenant']), tenantRoutes)

// SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
