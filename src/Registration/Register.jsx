import React, { useState, useRef, useEffect } from 'react';
import useAuthStore from '../Store/UserStore';
import { useNavigate } from 'react-router-dom';
import PowerModeInput from "power-mode-input";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
    password: '',
    confirmPassword: ''
  });

  const { register } = useAuthStore();
  const navigate = useNavigate();

  // ✅ Refs for inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phnoRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // ✅ Initialize PowerModeInput on mount
  useEffect(() => {
    if (nameRef.current) PowerModeInput.make(nameRef.current);
    if (emailRef.current) PowerModeInput.make(emailRef.current);
    if (phnoRef.current) PowerModeInput.make(phnoRef.current);
    if (passwordRef.current) PowerModeInput.make(passwordRef.current);
    if (confirmPasswordRef.current) PowerModeInput.make(confirmPasswordRef.current);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await register(formData);
      alert('You are registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          ref={phnoRef}
          type="text"
          name="phno"
          placeholder="Phone No"
          value={formData.phno}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          ref={confirmPasswordRef}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        <p style={styles.toggle} onClick={() => navigate('/login')}>
  Already have an account? Login here
</p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eef2f5',
    height: '100vh',
  },
  form: {
    background: '#fff',
    padding: 30,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: 320,
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: 10,
    fontSize: 16,
    background: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  toggle: { marginTop: 15, color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }

};

export default Register;
