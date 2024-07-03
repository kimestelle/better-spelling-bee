import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      fetch('http://127.0.0.1:8000/users/get', {
        headers: { 'Authorization': `Bearer ${userToken}` }
      })
      .then(response => response.json())
      .then(data => setUser(data));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userToken', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
