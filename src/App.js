// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeFinder from './RecipeFinder';
import RecipeDetails from './RecipeDetails';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeFinder />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
