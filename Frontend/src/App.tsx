import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItemModal from "./components/AddItemModal";
import { useEffect, useState } from "react";
import SavedRecipeTable from "./components/SavedRecipeTable";
import AxiosService from "./Helper/axiosService";
import RecipeType from "./type";

function App() {
  const [recipeData, setRecipeData] = useState<RecipeType[]>([]);
  //Get all recipes
  const getListRecipe = async () => {
    const savedRecipe = await AxiosService.getAll();
    if (savedRecipe.data) {
      setRecipeData(savedRecipe.data);
    }
  };

  //Create new recipe
  const createRecipe = async (recipe: RecipeType) => {
    const savedRecipe = await AxiosService.create(recipe);
    if (savedRecipe.status == 200) {
      alert("Recipe added!")
      getListRecipe();
    }
  };

  useEffect(() => {
    getListRecipe();
  }, []);

  const handleSubmit = (recipe: RecipeType) => {
    createRecipe(recipe)
    
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <SavedRecipeTable recipes={recipeData} getListRecipe={getListRecipe}></SavedRecipeTable>
      <AddItemModal handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
