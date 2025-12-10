import React, { useState, useEffect } from "react";
import useCartStore from "../Store/CartStore";
import useAuthStore from "../Store/UserStore"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../config"

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const { user, fetchProfile } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [useSavedAddress, setUseSavedAddress] = useState(true); // ✅ default saved
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.offerPrice, 0);

  useEffect(() => {
    if (!user) {
      fetchProfile(); 
    }
  }, [user, fetchProfile]);

  if (cart.length === 0) {
    return <p>No items to checkout.</p>;
  }

  const checkoutHandler = async (totalAmount) => {
    try {
      const { data: { key } } = await axios.get(`${BASE_URL}/api/getkey`);
      const { data: { order } } = await axios.post(`${BASE_URL}/api/checkout`, { amount: totalAmount });

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "MyStore",
        description: "Payment Gateway Test",
        order_id: order.id,
        callback_url: `${BASE_URL}/api/paymentverification`,
        prefill: {
          name: user?.name || "John Doe",
          email: user?.email || "john@example.com",
          contact: user?.phno || "9999999999",
        },
        theme: { color: "#3399cc" }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // ✅ Confirm Order Handler
  const handlePayment = () => {
    let finalAddress = "";

    if (paymentMethod === "cod" || paymentMethod === "online") {
      if (user?.address && useSavedAddress) {
        finalAddress = user.address; // use saved
      } else {
        if (!address.trim()) {
          alert("Please enter your delivery address.");
          return;
        }
        finalAddress = address;
      }

      if (paymentMethod === "cod") {
        alert(`Order placed successfully with Cash on Delivery.\nDelivery Address: ${finalAddress}`);
        clearCart();
        navigate("/");
      } else {
        checkoutHandler(totalPrice);
      }
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Summary</h2>
      {cart.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{item.title}</h3>
          <p>{item.details}</p>
          <p>Price: ₹{item.offerPrice}</p>
        </div>
      ))}
      <h3>Total: ₹{totalPrice}</h3>

      <h3>Select Payment Method:</h3>
      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> Cash on Delivery
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="payment"
            value="online"
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> Pay Online (Razorpay)
        </label>
      </div>

      {/* ✅ Address Handling */}
      {paymentMethod && (
        <div style={{ marginBottom: 20 }}>
          {user?.address ? (
            <>
              <h3>Choose Address:</h3>
              <label>
                <input
                  type="radio"
                  name="addressOption"
                  checked={useSavedAddress}
                  onChange={() => setUseSavedAddress(true)}
                /> Use saved address: <b>{user.address}</b>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="addressOption"
                  checked={!useSavedAddress}
                  onChange={() => setUseSavedAddress(false)}
                /> Enter another address
              </label>

              {!useSavedAddress && (
                <textarea
                  rows={4}
                  cols={50}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full delivery address"
                  style={{ display: "block", marginTop: 10 }}
                />
              )}
            </>
          ) : (
            <>
              <h3>Please enter your full delivery address:</h3>
              <textarea
                rows={4}
                cols={50}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full delivery address"
              />
            </>
          )}
        </div>
      )}

      <button
        style={{ padding: 10, backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: 5 }}
        onClick={handlePayment}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
