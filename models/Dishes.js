const mongoose = require("mongoose");

// Schema("template", optional configuration obj)
const dishesSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "You must provide a name."] },
    review: { type: String, required: false },
    recommend: Boolean,
    img: { type: String, required: false }
  },
  {
    timestamps: true, // adds a createdAt and an updatedAt
    // createdAt: "joined" you can rename these properties
  },
);

const Dishes = mongoose.model("Dishes", dishesSchema);

module.exports = Dishes;