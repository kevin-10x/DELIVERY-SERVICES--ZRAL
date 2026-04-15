import { Link } from "react-router-dom";

export default function Home() {

  return (

    <div style={{ textAlign: "center", padding: "20px" }}>

      <h1>🚚 Baraton Express</h1>

      <p>Fast Delivery Around Baraton</p>

      <Link to="/order" style={{ padding: "10px 20px", background: "green", color: "white", textDecoration: "none", margin: "10px" }}>Order Now</Link>

      <Link to="/track" style={{ padding: "10px 20px", background: "blue", color: "white", textDecoration: "none", margin: "10px" }}>Track Order</Link>

      <Link to="/admin" style={{ padding: "10px 20px", background: "red", color: "white", textDecoration: "none", margin: "10px" }}>Admin</Link>

    </div>

  );

}