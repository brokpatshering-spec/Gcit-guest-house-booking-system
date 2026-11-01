import React, { useState, useEffect } from 'react';
import { Building, Save, CheckCircle, AlertCircle } from 'lucide-react';
import styles from '../styles/GuestHouseManagement.module.css';
import api from '../services/api';

const GuestHouseManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await api.get('/guesthouse');
      if (response.data) {
        setFormData({
          name: response.data.name || '',
          description: response.data.description || '',
          address: response.data.address || '',
          phone: response.data.phone || '',
          email: response.data.email || '',
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to load guest house details.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await api.put('/guesthouse', formData);
      setStatusMessage({
        type: 'success',
        text: res.data.message || 'Details updated successfully.',
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text:
          err.response?.data?.message ||
          'Error updating details. Check admin permissions.',
      });
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '1rem', color: '#64748b' }}>Loading details...</div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>
        <span className="icon-badge">
          <Building size={20} />
        </span>
        Manage Guest House Details
      </h2>

      {statusMessage.text && (
        <div
          className={`alert-box ${
            statusMessage.type === 'error' ? 'alert-error' : 'alert-success'
          }`}
        >
          {statusMessage.type === 'error' ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle size={18} />
          )}
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Guest House Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. GCIT Main Guest House"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            className={styles.textarea}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.gridTwo}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          <Save size={18} />
          Save Details →
        </button>
      </form>
    </div>
  );
};

export default GuestHouseManagement;