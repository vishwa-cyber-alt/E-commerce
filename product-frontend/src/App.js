import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import './styles.css';

function AppContent() {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailPage = location.pathname.startsWith('/product/');

  return (
    <div className="container">
      {!isDetailPage ? (
        <>
          <h1>Product Listing</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-bar"
          />
        </>
      ) : (
        <>
          <button
            className="back-button"
            onClick={() => {
              setQuery('');
              navigate('/');
            }}
          >
            ← Back
          </button>
          <h1>Product Details</h1>
        </>
      )}

      <Routes>
        <Route path="/" element={<ProductList query={query} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
