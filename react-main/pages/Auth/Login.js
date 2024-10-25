import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUsername = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const data = { username, password };

        try {
            const response = await axios.post("http://localhost:8080/auth/login", data);
            localStorage.setItem("token", response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError("Invalid username or password. Please try again.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="text-center mb-4">
                    <h1>Login</h1>
                    <p>Enter your credentials to access your account</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            onChange={handleUsername} 
                            placeholder="Enter Username" 
                            required 
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            onChange={handlePassword} 
                            placeholder="Enter Password" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block" 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
