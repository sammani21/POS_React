import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Product = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        setLoading(true);
        fetch(`http://localhost:8080/products/${params.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details.");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-link" onClick={() => navigate(-1)}>
                &larr; Back
            </button>

            <h1 className="text-center my-4">Product Details</h1>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading product details...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            ) : (
                product && (
                    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
                        <h2 className="card-title text-center mb-3">{product.name}</h2>
                        <div className="card-body">
                            <p>
                                <strong>Quantity:</strong> {product.qty}
                            </p>
                            <p>
                                <strong>Price:</strong> ${product.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Product;
