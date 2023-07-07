import mongoose from 'mongoose';
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  recipeName: String,
  ingridients: String,
  direction: String,
});

const RecipeModal = mongoose.model('RecipeModal', RecipeSchema);
export default RecipeModal