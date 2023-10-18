
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../assets/table.css';

const baseURL = process.env.REACT_APP_BASE_URL

function TableContent() {
  const { state, dispatch } = useUser();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get(`${baseURL}/allusers`)
      .then((response) => {
        dispatch({ type: 'SET_USERS', payload: response.data });
        setLoading(false); 
        console.log('Fetched users data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false); 
      });
  }, [dispatch]);

  const handleDelete = (userId) => {
    setDeleteConfirmation(userId);
  }

  const confirmDelete = () => {
    if (deleteConfirmation) {
      axios.delete(`${baseURL}/${deleteConfirmation}`)
        .then(() => {
          dispatch({ type: 'REMOVE_USER', payload: deleteConfirmation });
          setDeleteConfirmation(null);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover size="sm">
               <thead>
                 <tr>
                   <th>Sl.No</th>
                   <th>Username</th>
                   <th>Email</th>
                   <th>DOB</th>
                   <th>Age</th>
                   <th>City</th>
                   <th>Delete</th>
                 </tr>
               </thead>
               <tbody>
                 {state.users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      {deleteConfirmation === user.id ? (
                        <div>
                          <button onClick={confirmDelete}>Confirm</button>
                          <button onClick={cancelDelete}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
      )}
    </div>
  );
}

export default TableContent;
