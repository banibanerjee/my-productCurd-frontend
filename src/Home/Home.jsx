import React, { useEffect, useState } from "react";
import { useProductStore } from "../Store/ProductStore";
import useCartStore from "../Store/CartStore";
import Navbar from "../Components/Navber";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";


const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const banners = [
    "https://as2.ftcdn.net/v2/jpg/02/49/50/15/1000_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg",
    "https://as1.ftcdn.net/v2/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    "https://t3.ftcdn.net/jpg/05/47/69/58/240_F_547695839_IujiLmCh7AgbYd2Eyk5hgQcCYftTqQxV.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [visibleRows, setVisibleRows] = useState(2); // ✅ Start with 2 rows
  const [productsPerRow, setProductsPerRow] = useState(4); // default desktop

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Detect screen width to decide how many products per row
  useEffect(() => {
    const updateProductsPerRow = () => {
      if (window.innerWidth < 640) setProductsPerRow(2); // mobile
      else if (window.innerWidth < 1024) setProductsPerRow(3); // tablet
      else setProductsPerRow(4); // desktop
    };
    updateProductsPerRow();
    window.addEventListener("resize", updateProductsPerRow);
    return () => window.removeEventListener("resize", updateProductsPerRow);
  }, []);

  // ✅ Apply sorting
  let sortedProducts = [...products];
  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  } else if (sortOption === "az") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "za") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // ✅ Show only limited products based on visible rows
  const visibleProducts = sortedProducts.slice(0, visibleRows * productsPerRow);

  return (
    <div style={{ minHeight: "100vh" }}>
   
      <Navbar />

      {/* Banner */}
     
      <div style={styles.bannerContainer}>
  <img
    src={banners[currentBanner]}
    alt="Sale Banner"
    style={styles.bannerImage}
  />
  <div style={styles.bannerOverlayLeft}></div>
  <div style={styles.bannerOverlayRight}></div>
</div>

      {/* Sorting */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label>Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: "5px 10px" }}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="az">Name: A → Z</option>
          <option value="za">Name: Z → A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {visibleProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            style={styles.card}
          >
            <img
              src={product.mainImage}
              alt={product.title}
              style={styles.image}
            />
            <h3>{product.title}</h3>
            <p style={{ color: "#666" }}>{product.details}</p>
            <p>
              <del>₹{product.price}</del> &nbsp;
              <strong style={{ color: "#d32f2f" }}>
                ₹{product.offerPrice}
              </strong>
            </p>
            <button
              style={styles.addButton}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ✅ See More Button */}
      {visibleProducts.length < sortedProducts.length && (
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <button
            onClick={() => setVisibleRows((prev) => prev + 2)}
            style={{
              padding: "10px 20px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            See More
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

const styles = {
  bannerContainer: {
    position: "relative",
    width: "100%",
    height: "250px",
    overflow: "hidden",
    marginTop: "60px",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
    padding: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #ddd",
    padding: 15,
    textAlign: "center",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 5,
  },

  addButton: {
    marginTop: 10,
    padding: "10px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 4,
    width: "100%",
  },

  /* MOBILE FIXES */
  "@media (max-width:480px)": {
    bannerContainer: { height: "180px" },
    image: { height: 120 },
    addButton: { padding: "8px" },
  },
};

export default Home;
