import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id || product.id}`} className="card">
      <img src={product.image} alt={product.name} className="product-img" />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p><strong>${product.price}</strong></p>
      </div>
    </Link>
  );
}

export default ProductCard;
