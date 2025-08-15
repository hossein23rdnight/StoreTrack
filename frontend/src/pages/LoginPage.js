import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImg from '../images/warehouse-management-software.png';

const LoginPage = ({ setIsAuthenticated }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); 

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isLoginMode) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const handleLogin = async () => {
        setError('');
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data)); 

            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed!');
        }
    };

    const handleRegister = async () => {
        setError('');
        if (password.length < 6) {
             setError('Password must be at least 6 characters long');
             return;
        }
        try {
            const { data } = await axios.post('/api/users', { username, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data)); 

            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div>
            <div className='fixed w-screen py-4 px-2 bg-gray-900 text-white flex justify-between'>
                <div className='container mx-auto flex items-center'><h1 className="text-2xl md:text-4xl font-semibold">StoreTrack</h1></div>
            </div>

            <div className="flex h-screen ">
                <div className="w-1/2 bg-gray-200 flex justify-center items-center">
                    <img src={loginImg} alt="Login" className="max-w-2xl" />
                </div>

                <div className="w-1/2 flex justify-center items-center">
                    <div className="w-2/3 max-w-md p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">{isLoginMode ? 'Welcome Back!' : 'Create Your Account'}</h2>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            {!isLoginMode && (
                                <div className="flex items-center border rounded-lg">
                                    <span className="px-3"><i className="fa fa-address-card text-gray-500"></i></span>
                                    <input type="text" placeholder="Username" className="w-full py-3 px-4 outline-none" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                            )}

                            {/* Email field */}
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3"><i className="fa fa-user text-gray-500"></i></span>
                                <input type="email" placeholder="Email Address" className="w-full py-3 px-4 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            {/* Password field */}
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3"><i className="fa fa-lock text-gray-500"></i></span>
                                <input type="password" placeholder="Password" className="w-full py-3 px-4 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            
                            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                                {isLoginMode ? 'Login' : 'Sign Up'}
                            </button>
                        </form>
                        
                        {/* Toggle between Login and Sign Up */}
                        <div className="text-center mt-4">
                            <p>
                                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                                <span onClick={() => setIsLoginMode(!isLoginMode)} className="text-blue-500 cursor-pointer hover:underline">
                                    {isLoginMode ? 'Sign Up' : 'Login'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;