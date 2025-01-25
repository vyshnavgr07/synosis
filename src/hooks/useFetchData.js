import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUsers } from '../redux/userSlice';

const useFetchData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://reqres.in/api/users');
          console.log(response,"resss")
      
        dispatch(setUsers(response.data.data));
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]); 

  return { loading, error }; 
};

export default useFetchData;
