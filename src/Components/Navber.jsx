// Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../Store/ProductStore";
import useAuthStore from "../Store/UserStore";
import Login from "../Profile/Login";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { products } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const suggestions = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header style={styles.navbar}>
      {/* LEFT */}
      <div style={styles.left}>
        <h1 style={styles.logo}>My Store</h1>

        <span style={styles.welcome}>
          {user ? `Welcome, ${user.name.split(" ")[0]}` : "Welcome"}
        </span>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for 'apple watch'"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            style={styles.searchInput}
          />
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div style={styles.suggestionContainer}>
            {suggestions.slice(0, 6).map((p) => (
              <div
                key={p._id}
                style={styles.suggestionItem}
                onClick={() => {
                  navigate(`/search?query=${encodeURIComponent(p.title)}`);
                  setShowSuggestions(false);
                }}
              >
                {p.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        {!user ? (
          <button style={styles.button} onClick={() => setShowLoginPopup(true)}>
            Login
          </button>
        ) : (
          <button style={styles.button} onClick={() => navigate("/profile")}>
            Profile
          </button>
        )}

        <button style={styles.button} onClick={() => navigate("/cart")}>
          Cart
        </button>
      </div>

      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div style={styles.popupOverlay}>
          <Login closePopup={() => setShowLoginPopup(false)} />
        </div>
      )}
    </header>
  );
};

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "linear-gradient(rgb(236, 220, 255), white)",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap", // RESPONSIVE FIX
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logo: {
    color: "#6B21A8",
    fontSize: "22px",
    fontWeight: "bold",
  },

  welcome: {
    display: "block",
    fontSize: "16px",
  },

  searchBox: {
    flex: 1,
    margin: "10px 20px",
    position: "relative",
    minWidth: "180px",
  },

  searchInput: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #aaa",
  },

  suggestionContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "white",
    borderRadius: 6,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    zIndex: 50,
  },

  suggestionItem: {
    padding: "8px",
    cursor: "pointer",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  button: {
    padding: "6px 12px",
    background: "none",
    border: "1px solid black",
    borderRadius: 4,
    cursor: "pointer",
  },

  popupOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.5)",
    zIndex: 200,
  },

  /* MOBILE RESPONSIVE RULES */
  "@media (max-width:480px)": {
    welcome: {
      display: "none", // hide long text on small screen
    },
  },
};

export default Navbar;
