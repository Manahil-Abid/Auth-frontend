import React, { useState } from 'react';
import { createItem } from '../../utils/api';

function ItemForm({ token, onItemAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await createItem({ title, description }, token);
      onItemAdded(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create item');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add New Item</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button type="submit">Add Item</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default ItemForm;
