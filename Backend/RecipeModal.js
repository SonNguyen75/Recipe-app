import mongoose from 'mongoose';
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  recipeName: String,
  ingredients: String,
  directions: String,
});

const RecipeModal = mongoose.model('RecipeModal', RecipeSchema);
export default RecipeModal