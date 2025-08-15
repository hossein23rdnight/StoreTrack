import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Component Imports
import LeftNav from './components/LeftNav';
import Footer from './components/Footer';
import Header from './components/Header';

// Page Imports
import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/Inventory';
import AddProductForm from './components/AddProductForm';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import AddOrderPage from './pages/AddOrderPage'; 
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import InventoryHistoryPage from './pages/InventoryHistoryPage';


const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div>
            {isAuthenticated ? (
                <div className='flex min-h-screen bg-gray-100'>
                    <LeftNav />
                    <div className='flex flex-col flex-grow lg:w-[85%]'>
                        <Header handleLogout={handleLogout} />
                        <main className="flex-grow p-6">
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/inventory" element={<InventoryPage />} />
                                <Route path="/inventory/add-product" element={<AddProductForm />} />
                                <Route path="/inventory/history" element={<InventoryHistoryPage />} />
                                <Route path="/categories" element={<CategoriesPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="/orders/add" element={<AddOrderPage />} />
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </div>
    );
};


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userInfo'));

    return (
        <Router>
            <AppContent
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
        </Router>
    );
}

export default App;
