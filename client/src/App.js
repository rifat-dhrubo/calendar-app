import React from 'react';
import { Router } from '@reach/router';
import Landing from './pages/Landing';
import Book from './pages/Book';

function App() {
  return (
    <Router>
      <Landing path="/" />
      <Book path="/book" />
    </Router>
  );
}

export default App;
