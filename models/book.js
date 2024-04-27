var mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  description: String,
  published_year: String,
  publisher: String,
  price: Number,
  updated_date: { type: Date, default: Date.now },
  cover_photo: {
    type: String, // Assuming you will store the file path or URL to the cover photo
    default: "default_cover.jpg" // You can set a default cover photo if needed
  },
  imagePath: { type: String }
},
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});


module.exports = mongoose.model('Book', BookSchema);

