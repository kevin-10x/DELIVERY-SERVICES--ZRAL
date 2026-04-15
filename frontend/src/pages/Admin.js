import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/order/${id}`, { status });
    fetchOrders();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <p><strong>{order.item}</strong></p>
          <p>{order.location}</p>
          <p>Status: {order.status}</p>
          <p>Phone: {order.phone}</p>
          <button onClick={() => updateStatus(order._id, "picked")}>Picked</button>
          <button onClick={() => updateStatus(order._id, "on the way")}>On the Way</button>
          <button onClick={() => updateStatus(order._id, "delivered")}>Delivered</button>
        </div>
      ))}
    </div>
  );
}