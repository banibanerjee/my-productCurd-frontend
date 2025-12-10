// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.heading}>MyStore</h3>
          <p style={styles.text}>
            Your one-stop shop for amazing deals and quality products.
          </p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/productList" style={styles.link}>Products</a></li>
            <li><a href="/cart" style={styles.link}>Cart</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>📧 samplest@mystore.com</p>
          <p style={styles.text}>📞 +91 00000 11111</p>
          <p style={styles.text}>📍 Kolkata, India</p>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#757575",
    color: "#fff",
    marginTop: 40,
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "20px 20px",

    /* MOBILE FIX */
    gap: "20px",
  },

  section: {
    flex: "1 1 250px",
  },

  heading: {
    marginBottom: 10,
    fontSize: "1.2rem",
  },

  text: {
    margin: "5px 0",
    fontSize: "0.95rem",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    margin: "5px 0",
  },

  bottomBar: {
    background: "#616161",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "0.9rem",
  },
};

export default Footer;
