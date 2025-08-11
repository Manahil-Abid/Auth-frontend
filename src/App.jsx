import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ItemList from './components/Items/ItemList';
import ItemForm from './components/Items/ItemForm';
import { getItems } from './utils/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showLogin, setShowLogin] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchItems = async () => {
      try {
        const res = await getItems(token);
        setItems(res.data);
      } catch (err) {
        console.error('Failed to load items');
      }
    };
    fetchItems();
  }, [token]);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setItems([]); // Clear items on logout
  };

  const addItemToList = (item) => {
    setItems(prevItems => [item, ...prevItems]);
  };

  const updateItemInList = (updatedItem) => {
    setItems(prevItems => prevItems.map(item => item._id === updatedItem._id ? updatedItem : item));
  };

  const removeItemFromList = (id) => {
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <>
            <Login onLogin={handleLogin} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowLogin(false)}>Signup</button>
            </p>
          </>
        ) : (
          <>
            <Signup onSignup={handleLogin} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowLogin(true)}>Login</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <ItemForm token={token} onItemAdded={addItemToList} />
      <ItemList 
        token={token} 
        items={items} 
        onItemDelete={removeItemFromList} 
        onItemUpdate={updateItemInList}
      />
    </div>
  );
}

export default App;
