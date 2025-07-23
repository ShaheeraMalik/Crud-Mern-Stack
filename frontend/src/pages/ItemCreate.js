// src/pages/ItemCreate.js
import React, { useState } from 'react';
import { createItem } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function ItemCreate() {
  const [name, setName]               = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    // 1) simple client‑side check
    if (!name.trim()) {
      setErrorMessage('⚠️ Please enter a name for your item.');
      return;
    }

    try {
      // 2) POST both name & description
      await createItem({ name, description });
      navigate('/items');
    } catch (err) {
      console.error('Full error response:', err.response);
      const msg = err.response?.data?.message 
                  || 'Something went wrong. Please try again.';
      setErrorMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2em auto' }}>
      <h1>Create Item</h1>

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
            placeholder="Enter item name"
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
            placeholder="Enter a description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: '0.5em', minHeight: '80px' }}
          />
        </label>
      </div>

      <button type="submit" style={{ padding: '0.5em 1em' }}>
        Save
      </button>
    </form>
  );
}
