import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItemModal from "./components/AddItemModal";
import { useEffect, useState } from "react";
import SavedRecipeTable from "./components/SavedRecipeTable";
import AxiosService from "./Helper/axiosService";
import RecipeType from "./type";

function App() {
  const [recipeData, setRecipeData] = useState<RecipeType[]>([]);

  // useEffect(() => {
  //   const savedRecipe = localStorage.getItem("recipes");
  //   if (savedRecipe) {
  //     const parsedRecipe = JSON.parse(savedRecipe);
  //     setRecipeData(parsedRecipe);
  //   }
  // }, []);

  // hàm get list
  const getListRecipe = async () => {
    const savedRecipe = await AxiosService.getAll();
    if (savedRecipe.data) {
      setRecipeData(savedRecipe.data);
    }
  };

  // hàm create mới
  const createRecipe = async (recipe: RecipeType) => {
    const savedRecipe = await AxiosService.create(recipe);
    if (savedRecipe.status == 200) {
      alert("succesfully!")
      
    }
  };

  //giờ mình sẽ lấy data bằng cách call api
  useEffect(() => {
    getListRecipe();
  }, []);

  // sau khi submit thì sẽ call api để lấy lại data
  const handleSubmit = (recipe: RecipeType) => {
    console.log(recipe);
    createRecipe(recipe)
    getListRecipe();
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <SavedRecipeTable recipes={recipeData}></SavedRecipeTable>
      <AddItemModal handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
