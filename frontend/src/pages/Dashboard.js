import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductSalesChart from '../components/ProductSalesChart';
import ProductRevenueChart from '../components/ProductRevenueChart';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalTurnover, setTotalTurnover] = useState(0);
    
    const [productSalesData, setProductSalesData] = useState({ labels: [], data: [] });
    const [productRevenueData, setProductRevenueData] = useState({ labels: [], data: [] });
    const [lowStockProducts, setLowStockProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const promises = [
            axios.get('/api/products'),
            axios.get('/api/orders')
        ];

        Promise.all(promises)
            .then((responses) => {
                const products = responses[0].data;
                const orders = responses[1].data;

                setTotalProducts(products.length);
                setTotalOrders(orders.length);
                const turnover = orders.reduce((acc, order) => acc + order.totalPrice, 0);
                setTotalTurnover(turnover);

                const salesByProduct = {}; 
                
                products.forEach(p => {
                    salesByProduct[p._id] = { name: p.name, quantity: 0, revenue: 0 };
                });

                orders.forEach(order => {
                    order.products.forEach(item => {
                        if (item.product && salesByProduct[item.product._id]) {
                            salesByProduct[item.product._id].quantity += item.quantity;
                            salesByProduct[item.product._id].revenue += item.product.price * item.quantity;
                        }
                    });
                });
                
                const productLabels = Object.values(salesByProduct).map(p => p.name);
                
                setProductSalesData({
                    labels: productLabels,
                    data: Object.values(salesByProduct).map(p => p.quantity)
                });

                setProductRevenueData({
                    labels: productLabels,
                    data: Object.values(salesByProduct).map(p => p.revenue)
                });

                const lowStock = products.filter(p => p.quantity < 5);
                setLowStockProducts(lowStock);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-1">
                <main className="flex-1 p-6">
                    <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

                    {loading ? (
                        <p>Loading dashboard data...</p>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white p-6 rounded shadow-md">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Products</h2>
                                    <p className="text-4xl">{totalProducts}</p>
                                </div>
                                <div className="bg-white p-6 rounded shadow-md">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Orders</h2>
                                    <p className="text-4xl">{totalOrders}</p>
                                </div>
                                <div className="bg-white p-6 rounded shadow-md">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Turnover</h2>
                                    <p className="text-4xl">${totalTurnover.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white p-6 rounded shadow-md">
                                    <ProductSalesChart chartData={productSalesData} />
                                </div>

                                <div className="bg-white p-6 rounded shadow-md">
                                    <h2 className="text-xl font-semibold mb-4">Low Stock Products</h2>
                                    {lowStockProducts.length > 0 ? (
                                        <ul className="space-y-2">
                                            {lowStockProducts.map(p => (
                                                <li key={p._id} className="flex justify-between items-center border-b pb-1">
                                                    <span>{p.name}</span>
                                                    <span className="font-bold text-red-500">{p.quantity} left</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No products are low on stock.</p>
                                    )}
                                </div>

                                <div className="lg:col-span-3 bg-white p-6 rounded shadow-md mt-6">
                                    <ProductRevenueChart chartData={productRevenueData} />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
