import { useLocation, useNavigate } from "react-router-dom";
import { useProductStore } from "../Store/ProductStore";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, fetchProducts, loading } = useProductStore();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  const [sortOption, setSortOption] = useState("default"); // ✅ sorting state

  // ✅ Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  let filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Apply sorting
  if (sortOption === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.offerPrice - b.offerPrice);
  } else if (sortOption === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.offerPrice - a.offerPrice);
  } else if (sortOption === "az") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "za") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
  }

  if (loading) {
    return <p style={{ padding: "100px 20px" }}>Loading products...</p>;
  }

  return (
    <div style={{ padding: "100px 20px" }}>
      <h2>Search results for: "{searchTerm}"</h2>

      {/* ✅ Sorting Dropdown */}
      {filteredProducts.length > 0 && (
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
      )}

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8, cursor: "pointer" }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img src={product.mainImage} alt={product.title} style={{ width: "100%", height: 150, objectFit: "cover" }} />
              <h4>{product.title}</h4>
              <p>
                <del>₹{product.price}</del> <strong style={{ color: "red" }}>₹{product.offerPrice}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
