import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Order from './Order';
import './Product.css'; 

const Products = () => {
    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPay, setTotalPay] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate(); 

    
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName);
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
    
    const addToCart = (productId) => {
        
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
           
            setCart([...cart, { ...productToAdd, quantity: 1 }]);
            
            setTotalPay(prevTotalPay => prevTotalPay + parseFloat(productToAdd.price));
        }
    };
    const removeFromCart = (productId) => {
        const removedItem = cart.find(item => item.id === productId);
        setCart(cart.filter(item => item.id !== productId));
        setTotalPay(prevTotalPay => prevTotalPay - parseFloat(removedItem.price * removedItem.quantity));
    };

   
    const increaseQuantity = (productId) => {
        setCart(cart.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        }));
        setTotalPay(prevTotalPay => prevTotalPay + parseFloat(products.find(product => product.id === productId).price));
    };

    const decreaseQuantity = (productId) => {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem.quantity > 1) {
            setCart(cart.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }));
            setTotalPay(prevTotalPay => prevTotalPay - parseFloat(products.find(product => product.id === productId).price));
        }
    };

    
    const redirectToOrder = () => {
        const selectedProducts = cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));
        navigate('/order', { state: { totalPay, selectedProducts} });
    };
    const handleLogout = async () => {
        try {
            // await axios.post('http://localhost:8000/api/logout'); 
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="products-container">
            <div className="top-bar">
                <h2 className="welcome-message">Welcome, {userName}! for the our products</h2>
                <button className="logout-button1" onClick={handleLogout}>Logout</button>
            </div>
            
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                            <div className="button-container">
                                <button onClick={() => removeFromCart(item.id)} className='bt1'>Remove</button>
                                <button onClick={() => increaseQuantity(item.id)} >+</button>
                                <button onClick={() => decreaseQuantity(item.id)} >-</button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3  className="total-pay">Total Pay: {totalPay.toFixed(2)}</h3>
            <button className="pay-button" onClick={redirectToOrder}>Pay</button>
            <h3 className="products-heading">Available Products:</h3>
            <div className="category-buttons">
                <button onClick={() => setSelectedCategory(null)}>All</button>
                <button onClick={() => setSelectedCategory('Electronic')}>Electronic</button>
                <button onClick={() => setSelectedCategory('fashion')}>Fashion</button>
                <button onClick={() => setSelectedCategory('grocery')}>Grocery</button>
            </div>
            <ul className="products-list">
                {filteredProducts.map(product => (
                    <li key={product.id}>
                        <div className="product-item">
                            <img src={require(`../images/${product.image}`)} alt={product.name} />
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <p>Price: {product.price}</p>
                            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
