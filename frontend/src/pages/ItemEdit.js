// src/pages/ItemEdit.js
import React, { useState, useEffect } from 'react';
import { fetchItem, updateItem } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1) track both name & description
  const [name, setName]               = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2) load both fields from server
  useEffect(() => {
    fetchItem(id)
      .then(res => {
        setName(res.data.name || '');
        setDescription(res.data.description || '');
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('Failed to load item data.');
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    // 3) simple client‑side validation
    if (!name.trim()) {
      setErrorMessage('⚠️ Name is required.');
      return;
    }

    try {
      // 4) send both fields
      await updateItem(id, { name, description });
      navigate('/items');
    } catch (err) {
      console.error('Update failed:', err.response);
      setErrorMessage(err.response?.data?.message || 'Update failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2em auto' }}>
      <h1>Edit Item</h1>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '1em' }}>
          {errorMessage}
        </div>
      )}

      <div style={{ marginBottom: '1em' }}>
        <label>
          Name<span style={{ color: 'red' }}> *</span>
          <br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5em' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1em' }}>
        <label>
          Description (optional)
          <br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: '0.5em', minHeight: '80px' }}
          />
        </label>
      </div>

      <button type="submit" style={{ padding: '0.5em 1em' }}>
        Update
      </button>
    </form>
  );
}
