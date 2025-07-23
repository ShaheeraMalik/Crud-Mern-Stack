import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemList   from './pages/ItemList';
import ItemCreate from './pages/ItemCreate';
import ItemEdit   from './pages/ItemEdit';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"              element={<Navigate to="/items" />} />
        <Route path="/items"         element={<ItemList />} />
        <Route path="/items/new"     element={<ItemCreate />} />
        <Route path="/items/:id"     element={<ItemDetail />} />
        <Route path="/items/:id/edit" element={<ItemEdit />} />
      </Routes>
    </>
  );
}

export default App;
