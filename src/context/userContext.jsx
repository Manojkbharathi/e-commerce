import React, { createContext, useEffect, useReducer, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import userReducer, { actionType } from '../utils/reducers/userReducer'; // Import the reducer and action types

// Define initial user data
const UserContext = createContext();

const StoreProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(userReducer, { user: null }); // Initial state is null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
        setLoading(false);

        // Dispatch the user data
        if (documents.length > 0) {
          dispatch({
            type: actionType.SET_USER_DATA,
            user: documents[0], // Assuming the user data is in the first document
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <UserContext.Provider value={{ data, loading, user: state.user, dispatch }}>
      {console.log('Data:', data)}
      {children}
    </UserContext.Provider>
  );
};

export { StoreProvider };
