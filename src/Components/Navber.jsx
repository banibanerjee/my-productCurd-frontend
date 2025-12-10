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

  useEffect(() => {
    if (!showWelcomePopup) return;
  
    const timer = setTimeout(() => {
      setShowWelcomePopup(false);
      navigate("/", { replace: true });
    }, 1000); // 1 second delay
  
    return () => clearTimeout(timer);
  }, [showWelcomePopup]);

  return (
    <header
      className="sticky top-0 z-[102] bg-white pb-0"
      style={{
        background: "linear-gradient(rgb(236, 220, 255), rgb(255, 255, 255))",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
   {/* Left Section */}
<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <h1 style={{ color: "#6B21A8", fontSize: "24px", fontWeight: "bold" }}>
    My Store
  </h1>

  {/* Conditional Welcome Message */}
  <span
    style={{
      fontSize: "24px",
      fontWeight: "500",
      color: "#121212",
    }}
  >
    {user
      ? `Welcome, ${user.name.split(" ")[0]}` 
      : "Welcome"}
  </span>
</div>

      {/* Search Section */}
      <div style={{ flex: 1, margin: "0 20px", position: "relative" }}>
        <form onSubmit={handleSearchSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Search for 'apple watch'"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            style={{
              width: "90%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
            }}
          />
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              maxHeight: "240px",
              overflowY: "auto",
              zIndex: 50,
            }}
          >
            {suggestions.slice(0, 6).map((p) => (
              <div
                key={p._id}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/search?query=${encodeURIComponent(p.title)}`);
                  setShowSuggestions(false);
                  setSearchQuery(p.title);
                }}
              >
                {p.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!user ? (
          <button
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => setShowLoginPopup(true)}
          >
            <svg width="24" height="24" fill="none" stroke="black" viewBox="0 0 26 26">
              <circle cx="12.5" cy="11.168" r="3.5" strokeWidth="1.6" />
              <circle cx="12.5" cy="13.5" r="10.5" strokeWidth="1.6" />
              <path
                d="M19.5 21.3236C19.0871 20.0832 18.1773 18.9872 16.9117 18.2054C15.646 17.4237 14.0953 17 12.5 17C10.9047 17 9.35398 17.4237 8.08835 18.2054C6.82271 18.9872 5.91289 20.0832 5.5 21.3236"
                strokeWidth="1.6"
              />
            </svg>
            <span>Login</span>
          </button>
        ) : (
          <button
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="black"
              viewBox="0 0 26 26"
            >
              <circle cx="12.5" cy="11.168" r="3.5" strokeWidth="1.6" />
              <circle cx="12.5" cy="13.5" r="10.5" strokeWidth="1.6" />
              <path
                d="M19.5 21.3236C19.0871 20.0832 18.1773 18.9872 16.9117 18.2054C15.646 17.4237 14.0953 17 12.5 17C10.9047 17 9.35398 17.4237 8.08835 18.2054C6.82271 18.9872 5.91289 20.0832 5.5 21.3236"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        )}

        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/cart")}
        >
          <svg width="30" height="30" stroke="black" fill="none" viewBox="0 0 24 24">
            <path d="M10.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 3h14l-1.5 9H8L6 3z" />
          </svg>
          <span>Cart</span>
        </button>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
          }}
        >
          <Login
            closePopup={() => setShowLoginPopup(false)}
            onLoginSuccess={() => {
              setShowLoginPopup(false);
              setShowWelcomePopup(true);
            }}
          />
        </div>
      )}

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
          }}
          onClick={() => setShowWelcomePopup(false)}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Welcome 🎉</h2>
            <p>You have successfully logged in!</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;