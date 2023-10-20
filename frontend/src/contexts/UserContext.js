import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

// const baseURL = process.env.REACT_APP_BASE_URL

const initialState = {
  users: [], 
  token: null,
  isAuthenticated: false,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: null,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload, // Set the users received from the API response
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload), // Remove the user from the users list
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Fetch users from API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/allusers`); // Replace with your API endpoint
        dispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error if needed
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
