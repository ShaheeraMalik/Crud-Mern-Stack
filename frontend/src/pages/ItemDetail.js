// src/pages/ItemDetail.js
import React, { useState, useEffect } from 'react';
import { fetchItem } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItem(id)
      .then(res => setItem(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load item.');
      });
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item) return <p>Loading…</p>;

  const createdAt = new Date(item.createdAt).toLocaleString();

  return (
    <div style={{ maxWidth: 600, margin: '2em auto' }}>
      <h1>{item.name}</h1>

      <p>
        <strong>Description:</strong><br />
        {item.description || 'No description provided.'}
      </p>

      <p>
        <small>
          <strong>Created At:</strong> {createdAt}
        </small>
      </p>

      <button onClick={() => navigate('/items')} style={{ marginTop: '1em' }}>
        ← Back to list
      </button>
    </div>
  );
}
