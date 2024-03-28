import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Admin.css';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
      console.log('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <div className="admin-container">
        <div className="sidebar">
          <h2>Admin Dashboard</h2>
          <ul>
            <li><Link to="/admin">Home</Link></li>
            <li><Link to="/admin/allproducts">Products</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
          </ul>
        </div>
        <div className="main-content">
          <h2>All Orders</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Total Pay</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phoneNo}</td>
                  <td>{order.address}</td>
                  <td>{order.totalpay}</td>
                  <td>
                    <button onClick={() => deleteOrder(order.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
