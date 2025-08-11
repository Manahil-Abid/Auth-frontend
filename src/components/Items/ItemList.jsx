import React, { useState } from 'react';
import { deleteItem, updateItem } from '../../utils/api';

function ItemList({ token, items, onItemDelete, onItemUpdate }) {
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEditing = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdate = async () => {
    try {
      const res = await updateItem(editId, { title: editTitle, description: editDescription }, token);
      onItemUpdate(res.data);
      cancelEditing();
    } catch (err) {
      setError('Update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id, token);
      onItemDelete(id);
    } catch (err) {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <h2>Your Items</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {items.length === 0 && <p>No items found.</p>}
        {items.map(item => (
          <li key={item._id} style={{marginBottom: '15px'}}>
            {editId === item._id ? (
              <div>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                />
                <input 
                  type="text" 
                  value={editDescription} 
                  onChange={(e) => setEditDescription(e.target.value)} 
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{item.title}</strong>: {item.description}
                <button onClick={() => startEditing(item)} style={{marginLeft: '10px'}}>Edit</button>
                <button onClick={() => handleDelete(item._id)} style={{marginLeft: '10px'}}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
