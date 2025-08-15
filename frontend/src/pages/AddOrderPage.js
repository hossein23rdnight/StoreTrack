import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOrderPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setAllProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products.');
                setLoading(false);
            });
    }, []);

    const handleAddProductToOrder = (productToAdd) => {
        const existingItem = orderItems.find(item => item._id === productToAdd._id);

        if (existingItem) {
            handleUpdateQuantity(productToAdd._id, existingItem.quantity + 1);
        } else {
            setOrderItems([...orderItems, { ...productToAdd, quantity: 1 }]);
        }
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity, 10);

        if (quantity <= 0) {
            setOrderItems(orderItems.filter(item => item._id !== productId));
        } else {
            setOrderItems(orderItems.map(item =>
                item._id === productId ? { ...item, quantity: quantity } : item
            ));
        }
    };

    const totalPrice = useMemo(() => {
        return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }, [orderItems]);


    const handleSubmitOrder = async () => {
        setError(''); 
        if (orderItems.length === 0) {
            setError('Cannot submit an empty order.');
            return;
        }

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo._id) {
            setError('User not logged in. Please log in again.');
            return;
        }

        const orderPayload = {
            user: userInfo._id,
            products: orderItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
            })),
            totalPrice: parseFloat(totalPrice),
        };

        try {
            const { data } = await axios.post('/api/orders', orderPayload);
            
            if (data.notifications && data.notifications.length > 0) {
                alert("Order placed successfully with warnings:\n" + data.notifications.join("\n"));
            } else {
                alert('Order placed successfully!');
            }
            
            navigate('/orders'); 
        } catch (err) {
            console.error('Error creating order:', err);
            setError(err.response?.data?.message || 'Failed to create order.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
            <div className="md:w-1/2">
                <h1 className="text-3xl font-semibold mb-4">Available Products</h1>
                {loading && <p>Loading products...</p>}
                <div className="space-y-2 max-h-screen overflow-y-auto">
                    {allProducts.map(product => (
                        <div key={product._id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{product.name}</h3>
                                <p>${product.price.toFixed(2)} - <span className="text-gray-600">In Stock: {product.quantity}</span></p>
                            </div>
                            <button onClick={() => handleAddProductToOrder(product)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:w-1/2">
                <h1 className="text-3xl font-semibold mb-4">New Order</h1>
                <div className="p-4 border rounded-lg bg-white">
                    {orderItems.length === 0 ? (
                        <p>Your order is empty. Add products from the list on the left.</p>
                    ) : (
                        <div className="space-y-4">
                            {orderItems.map(item => (
                                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                                    <span>{item.name}</span>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleUpdateQuantity(item._id, e.target.value)}
                                            className="w-16 p-1 border rounded text-center"
                                            min="0"
                                        />
                                        <span>x ${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="text-right font-bold text-xl mt-4">
                                Total: ${totalPrice}
                            </div>
                        </div>
                    )}
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <button 
                    onClick={handleSubmitOrder} 
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded text-lg"
                    disabled={orderItems.length === 0}
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default AddOrderPage;
