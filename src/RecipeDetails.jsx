// RecipeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error("Error fetching recipe:", error));
  }, [id]);

  if (!recipe) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>

          <h5>Instructions:</h5>
          <ListGroup className="mb-3">
            {recipe.instructions.map((step, index) => (
              <ListGroup.Item key={index}>{step}</ListGroup.Item>
            ))}
          </ListGroup>

          <Button as={Link} to="/" variant="secondary">
            🔙 Back to Recipes
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
