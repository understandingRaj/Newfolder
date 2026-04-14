import { connectDb } from './utils/db.js'
import User from '../server/models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  await connectDb()

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(400).json({ status: 400, message: 'User does not exist' })
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)

    if (!isMatchedPassword) {
      return res.status(400).json({ status: 400, message: 'Invalid credentials' })
    }

    const token = await generateToken(user)

    res
      .status(200)
      .json({ status: 200, message: 'Login successful', token: token, user: user })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error logging in', error: error.message })
  }
}
