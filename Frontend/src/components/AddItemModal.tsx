import React, { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import "./css/AddItemModal.css"

interface Recipe {
  recipeName: string;
  ingredients: string;
  directions: string;
}

interface Props{
  handleSubmit: (recipe: Recipe) => void;
}

function AddItemModal({handleSubmit} : Props) {
  const [show, setShow] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngridients] = useState('');
  const [directions, setDirections] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.currentTarget.value);
  };

  const handleIngridientsChange = (event : ChangeEvent<HTMLInputElement>) => {
    setIngridients(event.currentTarget.value);
  }

  const handleDirectionsChange = (event : ChangeEvent<HTMLInputElement>) => {
    setDirections(event.currentTarget.value);
  }

  const handleFormSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    const newRecipe : Recipe = {
      recipeName: recipeName,
      ingredients: ingredients,
      directions: directions
    }
    handleSubmit(newRecipe);
    saveToLocalStorage(newRecipe);
    handleClose();
  };

  const saveToLocalStorage = (newRecipe : Recipe) => {
    const storedRecipes = localStorage.getItem('recipes');
    let recipes : Recipe[] = [];
    if(storedRecipes) {
      recipes = JSON.parse(storedRecipes)
    }
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  return (
    <>
      <Button className="save-button" variant="primary" onClick={handleShow}>
        Add New Recipe
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            <Form.Group className="mb-3" controlId="addItemForm.RecipeName">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control type="text" autoFocus onChange={handleNameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemForm.Ingredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleIngridientsChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemForm.Directions">
              <Form.Label>Directions</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleDirectionsChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="save-button" variant="primary" type="submit" onClick={handleFormSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddItemModal;
