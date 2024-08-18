import React from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;