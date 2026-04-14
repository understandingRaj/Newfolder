import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
  try {
    if (!token) return null
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (err) {
    return null
  }
}

export const requireAuth = (req) => {
  const token = req.headers.authorization
  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }
  return decoded
}
