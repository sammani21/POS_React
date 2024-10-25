import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Category.css'; // Separate CSS file for styling

const Category = () => {
    const params = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategoryById();
        getProductsByCategory();
    }, []);

    const getCategoryById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/categories/${params.id}`);
            const data = await response.json();
            setCategory(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError("Failed to load category");
            setLoading(false);
        }
    };

    const getProductsByCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/categories/${params.id}/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load products");
        }
    };

    return (
        <div className="category-container">
            {loading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    {category && (
                        <h1 className="category-title">
                            Products in {category.name} Category
                        </h1>
                    )}
                    
                    {products && products.length > 0 ? (
                        <ul className="product-list">
                            {products.map((product, index) => (
                                <li key={index} className="product-item">
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-products-message">No products available in this category.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Category;
