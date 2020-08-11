import React from 'react';
import Routing from './components/routing';
import './App.css';
import CreateProduct from '../src/components/products/create'

function App() {
  return (
    <div className="App">
      <Routing/>
      <CreateProduct />
    </div>
  );
}

export default App;
