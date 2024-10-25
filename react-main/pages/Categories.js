import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Categories.css'; 

const Categories = () => {
    const [categories, setCategories] = useState(null);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        fetch('http://localhost:8080/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleInput = (event) => {
        setNewCategory(event.target.value);
    };

    const createCategory = (event) => {
        event.preventDefault();
        const data = { "name": newCategory };

        fetch("http://localhost:8080/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setMessage("Category added successfully!");
                setNewCategory(""); // Clear input field
                getCategories(); // Refresh list
            })
            .catch(error => {
                setMessage("Failed to add category. Please try again.");
                console.log(error);
            });
    };

    return (
        <div className="categories-container">
            <h1>Categories</h1>

            {loading ? (
                <p>Loading categories...</p>
            ) : (
                categories && (
                    <ul className="category-list">
                        {categories.map((category) => (
                            <li key={category.id} className="category-item">
                                <Link to={`/categories/${category.id}`} className="category-link">
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
            )}

            <h2>Create a New Category</h2>

            {message && <div className="message">{message}</div>}

            <form onSubmit={createCategory} className="category-form">
                <label htmlFor="categoryName">Category Name</label>
                <input
                    type="text"
                    id="categoryName"
                    value={newCategory}
                    onChange={handleInput}
                    placeholder="Enter category name"
                    required
                />
                <button type="submit" className="submit-button">Save Category</button>
            </form>
        </div>
    );
};

export default Categories;
