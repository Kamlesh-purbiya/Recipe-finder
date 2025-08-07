// RecipeFinder.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeFinder = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/recipes')
      .then(response => {
        setRecipes(response.data.recipes);
        setFilteredRecipes(response.data.recipes);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  useEffect(() => {
    const debouncedFilter = debounce((query) => {
      if (query === '') {
        setFilteredRecipes(recipes);
      } else {
        setFilteredRecipes(
          recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    }, 500);

    debouncedFilter(query);
    return () => debouncedFilter.cancel();
  }, [query, recipes]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Recipe Finder</h1>
      <Form>
        <Form.Control
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4"
        />
      </Form>

      <Row>
        {filteredRecipes.map((recipe) => (
          <Col key={recipe.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Button as={Link} to={`/recipe/${recipe.id}`} variant="primary">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeFinder;
