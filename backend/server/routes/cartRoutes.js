import express from 'express';
import Cart from '../models/Cart.js';
const router = express.Router();


router.post('/add-to-cart', async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user.id; // from JWT

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ listing: listingId }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.listing.toString() === listingId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ listing: listingId });
      }
    }

    await cart.save();

    res.json({ message: "Added to cart", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;