import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItemModal from './components/AddItemModal';
import { useEffect, useState } from 'react';
import SavedRecipeTable from './components/SavedRecipeTable';

interface Recipe {
  recipeName: string;
  ingredients: string;
  directions: string;
}

function App() {
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedRecipe = localStorage.getItem('recipes');
    if (savedRecipe) {
      const parsedRecipe = JSON.parse(savedRecipe);
      setRecipeData(parsedRecipe);
      }
    }, []);
  
  const handleSubmit = (recipe : Recipe) => {
    console.log(recipe)
    setRecipeData([...recipeData, recipe]);
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <SavedRecipeTable recipes={recipeData}></SavedRecipeTable>
      <AddItemModal handleSubmit={handleSubmit}/>
    </div>
    
  );
}

export default App;
