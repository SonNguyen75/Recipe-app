import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import "./css/SavedRecipeTable.css";
import { ChangeEvent, useState } from "react";
import RecipeType from "../type";
import AxiosService from "../Helper/axiosService";

interface Props {
  recipes: RecipeType[];
  getListRecipe: () => {};
}
function SavedRecipeTable({ recipes, getListRecipe }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType>();
  const [selectedRecipeID, setSelectedRecipeID] = useState<any>();

  //States to edit recipe
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngridients] = useState('');
  const [directions, setDirections] = useState('');  

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleTableItemClick = (recipe: any) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeID(recipe._id);
    handleShowModal();
  };

  //Functions to edit the recipe
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.currentTarget.value);
  };

  const handleIngridientsChange = (event : ChangeEvent<HTMLInputElement>) => {
    setIngridients(event.currentTarget.value);
  }

  const handleDirectionsChange = (event : ChangeEvent<HTMLInputElement>) => {
    setDirections(event.currentTarget.value);
  }

  //Create new recipe
  const handleDeleteClick = async (recipe: RecipeType | undefined) => {
    // const deletedRecipeId = await AxiosService.find(recipe as RecipeType);
    const deletedRecipe = await AxiosService.delete(selectedRecipeID);
    if (deletedRecipe.status == 200) {
      alert("Recipe deleted!");
      handleCloseModal();
      getListRecipe();
    }
  };

  const handleEditClick = async () => {
    const updatedRecipe: RecipeType = {
      recipeName: recipeName !== '' ? recipeName : selectedRecipe?.recipeName || '',
      ingredients: ingredients !== '' ? ingredients : selectedRecipe?.ingredients || '',
      directions: directions !== '' ? directions : selectedRecipe?.directions || ''
    };
    
    const resonse = await AxiosService.update(updatedRecipe, selectedRecipeID)
    if (resonse.status == 200){
      alert("Recipe updated!");
      handleCloseModal();
      getListRecipe();
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
              onClick={() => handleTableItemClick(recipe)}
            >
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
              <Form id="form">
                <Form.Group className="mb-3" controlId="addItemForm.RecipeName">
                  <Form.Label>Recipe Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedRecipe.recipeName}
                    autoFocus
                    onChange={handleNameChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="addItemForm.Ingredients"
                >
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={selectedRecipe.ingredients}
                    rows={3}
                    onChange={handleIngridientsChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="addItemForm.Directions">
                  <Form.Label>Directions</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={selectedRecipe.directions}
                    rows={3}
                    onChange={handleDirectionsChange}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteClick(selectedRecipe);
            }}
          >
            Delete
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              handleEditClick();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SavedRecipeTable;
