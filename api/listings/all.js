import { connectDb } from '../utils/db.js'
import Listing from '../../server/models/Listing.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  await connectDb()

  try {
    const resp = await Listing.find().sort({ createdAt: -1 })

    res
      .status(200)
      .json({ status: 200, message: 'Listing fetched successfully', listings: resp })
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: 'Error fetching listing', error: error.message })
  }
}
