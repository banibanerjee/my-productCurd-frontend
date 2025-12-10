import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../Store/ProductStore.js";
import useCartStore from "../Store/CartStore.js";
import ParticlesBg from "particles-bg";

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState("default"); // ✅ sorting state

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

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

  return (
    <div>
      <h2>Product List</h2>

      {/* ✅ Sorting Dropdown */}
      <div style={{ marginBottom: "20px" }}>
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

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {sortedProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              margin: 10,
              width: 250,
              cursor: "pointer",
            }}
          >
            <img src={product.mainImage} alt={product.title} style={{ width: "100%", height: 200 }} />
            <h3>{product.title}</h3>
            <p>{product.details}</p>
            <p>
              <del>₹{product.price}</del> <strong>₹{product.offerPrice}</strong>
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
      <ParticlesBg type="polygon" bg={true} />
    </div>
  );
};

const styles = {
  addButton: {
    marginTop: 10,
    padding: "10px 20px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
export default ProductList;
