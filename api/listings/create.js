import { connectDb } from '../utils/db.js'
import { requireAuth } from '../utils/auth.js'
import Listing from '../../server/models/Listing.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const user = requireAuth(req)
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  await connectDb()

  const { title, description, price, images } = req.body || {}

  try {
    const listing = new Listing({
      userId: user.id,
      title: title,
      description: description,
      price: Number(price),
      images: Array.isArray(images) ? images : [],
    })

    const resp = await listing.save()

    res
      .status(200)
      .json({ status: 200, message: 'Listing created successfully', listing: resp })
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: 'Error creating listing', error: error.message })
  }
}
