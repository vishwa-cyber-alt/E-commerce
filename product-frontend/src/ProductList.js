import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ProductCard from './ProductCard';

const socket = io('http://localhost:3000'); 

function ProductList({ query }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:3000/api/products';
      if (query.trim()) {
        url = `http://localhost:3000/api/products/search/by-name?q=${encodeURIComponent(query)}`;
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  useEffect(() => {
    socket.on('product-updated', fetchProducts);
    socket.on('product-added', fetchProducts);

    return () => {
      socket.off('product-updated', fetchProducts);
      socket.off('product-added', fetchProducts);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
