import mongoose from "mongoose";

const listingShema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
   images: {
    type: [String],   // cleaner way
    default: []       // ✅ prevents errors if empty
  }
}, { timestamps:true })

const Listing = mongoose.model('Listing', listingShema);
export default Listing;