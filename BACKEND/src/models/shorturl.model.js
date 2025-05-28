import mongoose from "mongoose";
const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    // required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true, // Ensure that each short URL is unique
    index: true, // Index for faster lookups
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
   }
});
const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;