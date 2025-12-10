import React, { useState, useRef, useEffect } from 'react';
import useAuthStore from '../Store/UserStore.js';
import { useNavigate } from 'react-router-dom';
import PowerModeInput from "power-mode-input";

const Login = ({ closePopup, onLoginSuccess }) => {
  const { user, register, login, logout, loading } = useAuthStore();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', phno: '', password: '', confirmPassword: '', address: '', pincode: ''
  });
  const [loginForm, setLoginForm] = useState({ phno: '', password: '' });

  const loginPhnoRef = useRef(null);
  const loginPasswordRef = useRef(null);

  useEffect(() => {
    if (loginPhnoRef.current) PowerModeInput.make(loginPhnoRef.current);
    if (loginPasswordRef.current) PowerModeInput.make(loginPasswordRef.current);
  }, []);

  const handleRegisterChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await register(registerForm);
    setIsRegistering(false);
  };

 const handleLoginSubmit = async (e) => {
  e.preventDefault();
  const success = await login(loginForm.phno, loginForm.password);
  if (success) {
    if (typeof onLoginSuccess === "function") onLoginSuccess();

    // popup show hobe ekhn
    setTimeout(() => {
      navigate("/");   // 1 sec por redirect
    }, 1000);
  }
};

  return (
    <div style={closePopup ? styles.popupContainer : styles.container}>
      <div style={styles.formContainer}>
        {user ? (
          <>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phno}</p>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>

            {isRegistering ? (
              <form onSubmit={handleRegisterSubmit} style={styles.form}>
                {['name','email','phno','address','pincode','password','confirmPassword'].map((field) => (
                  <input
                    key={field}
                    type={field.includes('password') ? 'password' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                    value={registerForm[field]}
                    onChange={handleRegisterChange}
                    required
                    style={styles.input}
                  />
                ))}
                <button type="submit" style={styles.button}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
                <p style={styles.toggle} onClick={() => setIsRegistering(false)}>
                  Already have an account? Login
                </p>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} style={styles.form}>
                <input
                  ref={loginPhnoRef}
                  type="text"
                  name="phno"
                  placeholder="Phone Number"
                  value={loginForm.phno}
                  onChange={handleLoginChange}
                  required
                  style={styles.input}
                />
                <input
                  ref={loginPasswordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  style={styles.input}
                />
                <button type="submit" style={styles.button}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p style={styles.toggle} onClick={() => setIsRegistering(true)}>
                  New user? Register here
                </p>
              </form>
            )}

            {closePopup && (
              <button onClick={closePopup} style={{ marginTop: 10, color: "gray" }}>
                Cancel
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  formContainer: {
    background: '#fff',
    padding: 40,
    borderRadius: 10,
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    width: 400,
    textAlign: 'center'
  },
  form: { display: 'flex', flexDirection: 'column', gap: 15, marginTop: 20 },
  input: { padding: 12, fontSize: 16, border: '1px solid #ddd', borderRadius: 8 },
  button: {
    padding: 12,
    fontSize: 16,
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer'
  },
  toggle: {
    marginTop: 15,
    color: '#1976d2',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default Login;
