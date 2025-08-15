import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
        
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleDeleteProduct = (productId) => {
        axios.delete(`/api/products/${productId}`)
            .then(() => {
                setProducts(products.filter(product => product._id !== productId));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = categoryFilter === '' || product.category?._id === categoryFilter;

            const searchMatch = searchTerm === '' || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            return categoryMatch && searchMatch;
        });
    }, [products, searchTerm, categoryFilter]);


    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">Inventory</h1>
                <Link to="/inventory/add-product" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Add New Product
                </Link>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 p-4 bg-gray-100 rounded-lg">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} onDelete={handleDeleteProduct} />
                    ))
                 ) : (
                    <p className="col-span-full text-center text-gray-500">No products match the current filters.</p>
                 )}
            </div>
        </div>
    );
};

export default InventoryPage;
