import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import userReducer, { SET_USER_DATA } from '../utils/reducers/userReducer';
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
            type: SET_USER_DATA,
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

export { StoreProvider, UserContext };
