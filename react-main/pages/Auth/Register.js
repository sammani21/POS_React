import axios from "axios";
import { useState } from "react";
import './pages/Style.css'

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUsername = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        const data = {
            username,
            password,
            email
        };

        try {
            const response = await axios.post("http://localhost:8080/auth/register", data);
            setMessage("Registration successful!");
            setLoading(false);
        } catch (error) {
            setMessage("Registration failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="text-center mb-4">
                    <h1>Register</h1>
                    <p>Create a new account</p>
                </div>

                {message && <div className={`reg-alert ${message.includes("failed") ? "reg-alert-danger" : "reg-alert-success"}`}>{message}</div>}

                <form onSubmit={handleRegister}>
                    <div className="reg-form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="reg-form-control"
                            id="username"
                            onChange={handleUsername}
                            placeholder="Enter Username"
                            required
                        />
                    </div>
                    <div className="reg-form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="reg-form-control"
                            id="password"
                            onChange={handlePassword}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="reg-form-group mb-3">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className="reg-form-control"
                            id="email"
                            onChange={handleEmail}
                            placeholder="Enter Email Address"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="reg-btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
