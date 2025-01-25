import React from 'react';
import TableList from '../components/TableList';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const UsersList = () => {
  const navigate=useNavigate()


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 mt-5 ">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">User List</h1>
        <Button  
        className="bg-green-500"    
        onClick={()=>navigate("/user/add")}>  
        Add </Button>

      </div>
      <TableList />
    </div>
  );
};

export default UsersList;
