import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import OrderCard from '../components/OrderCard';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(''); // 'All', 'Pending', 'Sending', 'Complete', 'Canceled'

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

    const handleDeleteOrder = (orderId) => {
        axios.delete(`/api/orders/${orderId}`)
            .then(() => {
                setOrders(orders.filter(order => order._id !== orderId));
            })
            .catch(error => {
                console.error('Error deleting order:', error);
            });
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        axios.put(`/api/orders/${orderId}`, { status: newStatus })
            .then(response => {
                setOrders(orders.map(order => 
                    order._id === orderId ? response.data : order
                ));
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const statusMatch = statusFilter === '' || order.status === statusFilter;

            const searchMatch = searchTerm === '' || 
                order.products.some(item => 
                    item.product && item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            
            return statusMatch && searchMatch;
        });
    }, [orders, searchTerm, statusFilter]);


    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">Orders</h1>
                <Link to="/orders/add" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Add New Order
                </Link>
            </div>

            {/* --- Filter and Search UI --- */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 p-4 bg-gray-100 rounded-lg">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Sending">Sending</option>
                    <option value="Complete">Complete</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <OrderCard 
                            key={order._id} 
                            order={order} 
                            onDelete={handleDeleteOrder} 
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No orders match the current filters.</p>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
