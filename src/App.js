
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Profile/Login"
import Cart from "./Product/Cart";
import ProductList from "./Product/ProductList";
import Profile from "./Profile/Profile";
// import Register from "./Registration/Register";
import { ToastContainer } from 'react-toastify';
import Checkout from "./Product/Checkout";
import Home from "./Home/Home";
import ProductDetails from "./Product/ProductDetails";
import PaymentSuccess from "./Product/ProductSuccess";
import SearchResults from "./Product/SearchResults";
import Register from "./Registration/Register";

const App = () => {

  return (
    <>
      <ToastContainer />
     
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productList" element={<ProductList />} />
          
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
