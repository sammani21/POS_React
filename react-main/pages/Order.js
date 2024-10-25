import axios from "axios";
import { useEffect, useState } from "react";

const Order = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);
        } catch (error) {
            setMessage("Failed to load products.");
            console.error("Error loading products:", error);
        }
    };

    const calculateTax = (amount) => {
        return (amount * 0.15).toFixed(2); // assuming 15% tax
    };

    useEffect(() => {
        setTax(calculateTax(total));
    }, [total]);

    const addToOrder = (product) => {
        if (orders.some((order) => order.id === product.id)) {
            setMessage("This product is already in the order.");
            return;
        }
        setOrders([...orders, product]);
        setTotal(total + product.price);
    };

    const createOrder = async () => {
        const productIds = orders.map((product) => product.id);

        const data = {
            products: productIds,
        };

        try {
            const response = await axios.post("http://localhost:8080/orders", data);
            if (response.status === 200) {
                setOrders([]);
                setTotal(0);
                setTax(0);
                setMessage("Order completed successfully.");
            }
        } catch (error) {
            setMessage("Error completing the order.");
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className="container">
            <div className="heading text-center">
                <h1>Orders</h1>
                {message && <p className="message">{message}</p>}
            </div>

            <div className="row">
                {/* Product List */}
                <div className="col-md-6">
                    <h2>Products</h2>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product shadow-sm border bg-light px-3 py-3 mb-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h5>{product.name}</h5>
                                        <p className="text-muted">Price: ${product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="col text-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => addToOrder(product)}
                                        >
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>

                {/* Orders Summary */}
                <div className="col-md-6">
                    <h2>Order Summary</h2>
                    {orders.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2" className="text-end fw-bold">
                                        Subtotal
                                    </td>
                                    <td>${total.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-end fw-bold">
                                        Tax (15%)
                                    </td>
                                    <td>${tax}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-end fw-bold">
                                        Total
                                    </td>
                                    <td>${(total + parseFloat(tax)).toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    ) : (
                        <p>No items in the order.</p>
                    )}
                    <button className="btn btn-secondary w-100 mt-3" onClick={createOrder} disabled={orders.length === 0}>
                        Complete Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;
