const { Schema } = require("mongoose");

const recipe = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  diet: {
    type: String,
    required: true,
    enum: ["vegan", "vegeterian", "pesceterian", "flexeterian"]
  },
  duration: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  photoURL: String,
  ingridients: [ingredient]
});

const ingredient = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  unit: {
    type: String,
    required: true,
    enum: ["grams", "litres", "teaspoon", "tablespoon", "piece"]
  }
});

module.exports.recipeSchema = recipe;
module.exports.ingredientSchema = ingridient;
