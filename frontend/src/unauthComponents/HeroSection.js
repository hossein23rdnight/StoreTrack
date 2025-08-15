import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div>
            {/*  Section */}
            <section className="bg-gray-500 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Product Management</h1>
                        <p className="text-lg md:text-xl mb-8"></p>
                        
                        {/* The "Get Started" button is  functional */}
                        <button 
                            onClick={handleGetStarted} 
                            className="bg-green-500 hover:bg-green-600 text-white font-bold mt-4 py-3 px-8 rounded-lg text-lg"
                        >
                            Get Started
                        </button>

                        <div className="mt-12 text-left">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Features We've Built For You:</h2>
                            <ul className="list-disc list-inside text-lg space-y-2">
                                <li>
                                    <strong>Powerful Reporting Dashboard:</strong> Visualize sales quantity, revenue share, and identify low-stock products at a glance.
                                </li>
                                <li>
                                    <strong>Complete Order Management:</strong> Create new orders, which automatically reduces inventory, and track order status from "Pending" to "Complete".
                                </li>
                                <li>
                                    <strong>Efficient Inventory Tracking:</strong> Search and filter through all your products and categories with ease.
                                </li>
                                <li>
                                    <strong>Low-Stock Alerts:</strong> Get notified when creating an order causes a product's inventory to run low.
                                </li>
                                <li>
                                    <strong>Intuitive User Interface:</strong> A clean and responsive design to manage your business effectively.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HeroSection;
