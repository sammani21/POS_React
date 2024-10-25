import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import axios from "axios";
import './Home.css';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else {
                setError("Failed to load products.");
            }
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const createProduct = async (event) => {
        event.preventDefault();
        const data = { name, price, qty, categoryId };

        try {
            await axios.post("http://localhost:8080/products", data, {
                headers: { "Content-Type": "application/json" },
            });
            getProducts(); // Refresh product list after creation
        } catch (error) {
            console.log("Error creating product:", error);
        }
    };

    return (
        <div className="home-container">
            <h1 className="page-title">Home</h1>

            <div className="date-picker-container">
                <label className="date-picker-label">Select Date:</label>
                <DatePicker />
            </div>

            <button className="btn btn-primary" onClick={getProducts}>Refresh Products</button>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : products && products.length > 0 ? (
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-item">
                            <Link to={`/product/${product.id}`} className="product-link">{product.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-products-message">No products available</p>
            )}

            <form onSubmit={createProduct} className="product-form">
                <h2>Add a New Product</h2>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Product Price</label>
                    <input type="number" required onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" required onChange={(e) => setQty(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Please Select</option>
                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-submit">Save Product</button>
            </form>
        </div>
    );
};

export default Home;
