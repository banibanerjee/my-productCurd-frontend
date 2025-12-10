import React from "react";
import useCartStore from "../Store/CartStore.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.offerPrice, 0);

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginBottom: 20,
            padding: 15,
            borderRadius: 5,
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            src={item.mainImage}
            alt={item.title}
            style={{ width: 150, height: 150, objectFit: "cover", marginRight: 20, borderRadius: 5 }}
          />
          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            <p style={{ color: "#555" }}>{item.details}</p>
            <p>
              <del style={{ color: "#999" }}>₹{item.price}</del> &nbsp;
              <strong style={{ color: "#d32f2f", fontSize: "1.1rem" }}>₹{item.offerPrice}</strong>
            </p>
            <div style={{ display: "flex", marginTop: 10 }}>
              {item.subImages.map((subImg, idx) => (
                <img
                  key={idx}
                  src={subImg}
                  alt={`sub-${idx}`}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    marginRight: 5,
                    border: "1px solid #ccc",
                    borderRadius: 3
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => removeFromCart(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#d32f2f",
                color: "#fff",
                border: "none",
                borderRadius: 3,
                cursor: "pointer"
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 20, textAlign: "right" }}>
        <h3>Total Price: ₹{totalPrice}</h3>
        <button
          onClick={clearCart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#757575",
            color: "#fff",
            border: "none",
            borderRadius: 3,
            marginRight: 10,
            cursor: "pointer"
          }}
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: 3,
            cursor: "pointer"
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
