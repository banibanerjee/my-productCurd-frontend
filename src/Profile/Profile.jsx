import React, { useState, useEffect } from 'react';
import useAuthStore from '../Store/UserStore';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg'

const Profile = () => {  const { user, logout, fetchProfile } = useAuthStore();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(user || { name: '', email: '' });

  useEffect(() => {
    if (!user) {
      fetchProfile();
    } else {
      setProfile(user);
    }
  }, [user, fetchProfile]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Optionally send update to backend
    console.log('Updated Profile:', profile);
    setEditMode(false);
  };

  return (
    <div style={styles.container}>
    <ParticlesBg type="cobweb" bg={true} />
      <h2>User Profile</h2>
      <div style={styles.profileBox}>
        <label>Name:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <p>{profile.name}</p>
        )}

        <label>Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <p>{profile.email}</p>
        )}

        {editMode ? (
          <button onClick={handleSave} style={styles.button}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)} style={styles.button}>Edit Profile</button>
        )}

        <button onClick={() => { logout(); navigate('/'); }} style={{ ...styles.button, backgroundColor: "#dc3545" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial',
    maxWidth: '500px',
    margin: 'auto',
  },
  profileBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  input: {
    padding: '8px',
    fontSize: '14px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    borderRadius: '4px'
  }
};

export default Profile;
