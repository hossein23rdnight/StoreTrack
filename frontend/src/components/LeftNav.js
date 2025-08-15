import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const LeftNav = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };
    

    return (
        <nav className={`bg-gray-800 bg-opacity-30 text-white w-64 h-screen lg:w-[15%] flex flex-col ${collapsed ? 'collapsed' : ''}`}>
            <div className="flex items-center justify-between p-4 border-gray-700 text-black">
                <h1 className="text-2xl font-bold">StoreTrack</h1>
                <button onClick={toggleCollapse} className="focus:outline-none">
                    {collapsed ? (
                        <i className="fas fa-bars"></i>
                    ) : (
                        <i className="fas fa-chevron-left"></i>
                    )}
                </button>
            </div>
            <nav className="py-2 flex-1 text-black">
                <ul>
                    <li>
                        <Link to="/dashboard" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/dashboard') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i className="fa-solid fa-house mr-3"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/inventory" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/inventory') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i className="fa-solid fa-cart-flatbed mr-3"></i>
                            Inventory/Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/inventory/history" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/inventory/history') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i className="fa-solid fa-clock-rotate-left mr-3"></i>
                            Inventory History
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/categories') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i className="fa-solid fa-table-list mr-3"></i>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/orders') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i className="fa-solid fa-chart-line mr-3"></i>
                            Orders
                        </Link>
                    </li>
                </ul>
            </nav>
        </nav>
    );
}

export default LeftNav;
