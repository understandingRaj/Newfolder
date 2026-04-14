import { connectDb } from '../utils/db.js'
import { requireAuth } from '../utils/auth.js'
import Cart from '../../server/models/Cart.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const user = requireAuth(req)
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  await connectDb()

  const { listingId } = req.body

  try {
    let cart = await Cart.findOne({ user: user.id })

    if (!cart) {
      cart = new Cart({
        user: user.id,
        items: [{ listing: listingId }],
      })
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.listing.toString() === listingId
      )

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1
      } else {
        cart.items.push({ listing: listingId })
      }
    }

    await cart.save()

    res.json({ message: 'Added to cart', cart })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
