import { createContext, useContext, useState, useEffect } from "react";

// Context তৈরি
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("user"); // cleanup
      }
    }
  }, []);

  const login = (userData, token) => {
      const safeUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      _id: userData._id
    };
    localStorage.setItem("user", JSON.stringify(safeUser));
    localStorage.setItem("token", token);
    setUser(safeUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
