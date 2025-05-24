import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ProductCard from './ProductCard';

const socket = io('http://localhost:3000'); 

function ProductList({ query }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (currentQuery = '') => {
    setLoading(true);
    try {
      let url = 'http://localhost:3000/api/products';
      if (currentQuery.trim()) {
        url = `http://localhost:3000/api/products/search/by-name?q=${encodeURIComponent(currentQuery)}`;
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

  useEffect(() => {
    const handleUpdate = () => fetchProducts(''); 

    socket.on('product-updated', handleUpdate);
    socket.on('product-added', handleUpdate);

    return () => {
      socket.off('product-updated', handleUpdate);
      socket.off('product-added', handleUpdate);
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
