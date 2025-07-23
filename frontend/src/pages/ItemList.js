// src/pages/ItemList.js
import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const loadItems = async () => {
    try {
      const res = await fetchItems();
      setItems(res.data);
      setErrorMessage('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to load items.');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(id);
      loadItems();
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to delete item.');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2em auto' }}>
      <h1>Items</h1>

      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}

      {items.length === 0 ? (
        <p>No items found. <Link to="/items/new">Create one?</Link></p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => {
            const createdAt = new Date(item.createdAt).toLocaleString();
            return (
              <li
                key={item._id}
                style={{
                  marginBottom: '1.5em',
                  paddingBottom: '1em',
                  borderBottom: '1px solid #ddd'
                }}
              >
                <h2 style={{ margin: 0 }}>
                  <Link to={`/items/${item._id}`}>{item.name}</Link>
                </h2>
                <p style={{ margin: '0.5em 0' }}>
                  {item.description || <em>No description provided.</em>}
                </p>
                <small>Created At: {createdAt}</small>
                <div style={{ marginTop: '0.5em' }}>
                  <button onClick={() => navigate(`/items/${item._id}/edit`)}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
