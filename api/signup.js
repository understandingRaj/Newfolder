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

  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email: email })

    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: 'User already exists', user: user })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    })

    const resp = await newUser.save()
    const token = generateToken(resp)

    res
      .status(200)
      .json({ status: 200, message: 'User created successfully', token: token, user: resp })
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: 'Error creating user', error: error.message })
  }
}
