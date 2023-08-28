import React, { createContext, useContext, useState } from 'react';

// Create a new context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [editedUserData, setEditedUserData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
  });

  return (
    <UserContext.Provider value={{ editedUserData, setEditedUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access the context
export const useUserContext = () => {
  return useContext(UserContext);
};
