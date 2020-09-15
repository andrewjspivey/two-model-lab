const mongoose = require("mongoose");

// Schema("template", optional configuration obj)
const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "You must provide a name."] },
    location: { type: String, required: false },
    recommend: Boolean,
  },
  {
    timestamps: true, // adds a createdAt and an updatedAt
    // createdAt: "joined" you can rename these properties
  },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;