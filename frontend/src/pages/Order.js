import axios from "axios";

import { useState } from "react";

export default function Order() {

  const [data, setData] = useState({

    name: "",

    location: "",

    item: "",

    phone: ""

  });

  const handleSubmit = async () => {

    await axios.post("http://localhost:5000/order", data);

    alert("Order placed!");

  };

  const handlePayment = async () => {

    await axios.post("http://localhost:5000/mpesa", { phone: data.phone, amount: 100 });

    alert("Payment initiated");

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Place Order</h2>

      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} style={{ display: "block", margin: "10px 0" }}/>

      <input placeholder="Location" onChange={e => setData({...data, location: e.target.value})} style={{ display: "block", margin: "10px 0" }}/>

      <input placeholder="Item" onChange={e => setData({...data, item: e.target.value})} style={{ display: "block", margin: "10px 0" }}/>

      <input placeholder="Phone" onChange={e => setData({...data, phone: e.target.value})} style={{ display: "block", margin: "10px 0" }}/>

      <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "green", color: "white" }}>Submit</button>

      <button onClick={handlePayment} style={{ padding: "10px 20px", background: "blue", color: "white", marginLeft: "10px" }}>Pay with M-Pesa</button>

    </div>

  );

}