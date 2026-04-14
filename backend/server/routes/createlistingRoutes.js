import express from 'express';
import Listing from '../models/Listing.js';
const router = express.Router();

router.post('/create-listing', async (req, res) => {
    const { title, description, price, images } = req.body || {}
    try {
        const listing = new Listing({
            userId: req.user.id,  // 🔥 associate listing with user
            title: title,
            description: description,
            price: Number(price),
            images: Array.isArray(images) ? images : []
        })
        const resp = await listing.save();

        res.status(200).json({ status: 200, message: 'Listing created successfully', listing: resp })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating listing', error: error.message })
    }
})
router.get('/fetch-all-listings', async (req, res) => {
    try {
        const resp = await Listing.find().sort({ createdAt: -1 })

        res.status(200).json({ status: 200, message: 'Listing fetched successfully', listings: resp })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error fetching listing', error: error.message })
    }
})
router.get('/:id', async (req, res) => {
    console.log(req.params,'%%%%%%%%%==> req.query')
    try {
        const resp = await Listing.findOne({ _id: req.params.id })

        res.status(200).json({ status: 200, message: 'Listing fetched successfully', listing: resp })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error fetching listing', error: error.message })
    }
})

export default router;