import React from 'react';

const Header = ({ handleLogout }) => {
    return (
        <header className="bg-gray-200 px-4 py-2 flex justify-between items-center">
            <div className="logo">
                <h1 className="text-2xl font-bold text-black">Hey!</h1>
            </div>

            <div className="flex items-center space-x-4">


                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
