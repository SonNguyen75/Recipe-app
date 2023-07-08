import { ListGroup, Button, Modal } from "react-bootstrap";
import "./css/SavedRecipeTable.css";
import { useState } from "react";
import RecipeType from "../type";
import AxiosService from "../Helper/axiosService";

interface Props {
  recipes: RecipeType[];
  getListRecipe: ()=>{}
}
function SavedRecipeTable({ recipes, getListRecipe }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType>();
  const [selectedRecipeID, setSelectedRecipeID] = useState<any>();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleTableItemClick = (recipe : any) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeID(recipe._id)
    handleShowModal();
  }

 //Create new recipe
 const handleDeleteClick = async (recipe : RecipeType | undefined) => {
	// const deletedRecipeId = await AxiosService.find(recipe as RecipeType);
	const deletedRecipe = await  AxiosService.delete(selectedRecipeID);
  if (deletedRecipe.status == 200) {
    alert("delete!")
    handleCloseModal();
    getListRecipe()
  }
	
 }		
  return (
    <>
      <div className="center">
        <ListGroup className="list-group">
          <ListGroup.Item className="list-item-header">
            Saved History
          </ListGroup.Item>
          {recipes.length === 0 && (
            <ListGroup.Item>No saved recipes</ListGroup.Item>
          )}
          {recipes.map((recipe, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleTableItemClick(recipe)}>
              {recipe.recipeName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecipe && (
            <div>
              <h4>Recipe Name</h4>
              <p className="paragraph">{selectedRecipe.recipeName}</p>
              <h4>Ingredients</h4>
              <p className="paragraph">{selectedRecipe.ingredients}</p>
              <h4>Directions</h4>
              <p className="paragraph">{selectedRecipe.directions}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {handleDeleteClick(selectedRecipe)}}>
            Delete
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SavedRecipeTable;
