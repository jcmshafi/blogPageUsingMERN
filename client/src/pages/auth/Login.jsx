import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('ostad@gmail.com');
    const [password, setPassword] = useState('12345');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://blogapi-mt4q.onrender.com/api/v1/login', {
                email,
                password,
            });
            console.log(data);
            if (data.error) {
                toast.error('Login Failed');
            } else {
                localStorage.setItem('authorization',(data.token))
                localStorage.setItem('role', data.user.role);
                if( data.user.role === "admin" ){
                    toast.success('Admin Login');
                } else {
                    toast.success('User Login');
                }
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
