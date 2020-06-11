import React from 'react';
import { Router } from '@reach/router';
import Landing from './pages/Landing';
import Book from './pages/Book';
import Show from './pages/Show';

function App() {
  return (
    <Router>
      <Landing path="/" />
      <Book path="/book" />
      <Show path="/show" />
    </Router>
  );
}

export default App;
