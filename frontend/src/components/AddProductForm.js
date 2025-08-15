import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
            sku,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            category,
        };
        
        axios.post('/api/products', newProduct)
            .then(() => {
                navigate('/inventory');
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    };

    return (
        <div className='p-6'>
            <h2 className="text-3xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="border border-gray-200 rounded-md p-4 flex flex-col items-center m-auto md:w-[50%]">

                <input type="text" placeholder="Product Name" value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />
                
                <input type="text" placeholder="Description" value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                />
                
                <input type="text" placeholder="SKU" value={sku} 
                        onChange={(e) => setSku(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />
                
                <input type="number" placeholder="Price" value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />
                
                <input type="number" placeholder="Quantity" value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.length > 0 ? (
                        categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))
                    ) : (
                        <option disabled>Loading categories...</option>
                    )}
                </select>
                
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;