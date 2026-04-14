import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import conectDb from './config/db.js'
import multer from 'multer'
import userRoutes from './routes/userRoutes.js'
import listingRoutes from './routes/createlistingRoutes.js'
import authMiddleware from './auth/authMiddleware.js'
import cartRoutes from './routes/cartRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
const upload = multer({ dest: 'server/uploads/' })

conectDb()

// Serve uploaded files statically
app.use('/uploads', express.static('server/uploads'))
app.use(express.static(path.join(__dirname, '..', 'dist')))

app.post('/api/upload', upload.array('images'), (req, res, next) => {
    console.log(req.files, "files");

    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    res.status(200).json({ message: 'Listing uploaded successfully', files: filePaths })
})


// routes
app.use('/api/signup', userRoutes)
app.use('/api/login', userRoutes)
app.use('/api/listings', authMiddleware, listingRoutes)
app.use('/api/cart', authMiddleware, cartRoutes)
app.use('/api/fetch-listings', listingRoutes)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

