import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import DeleteModal from './DeleteModal';

const TableList = () => {
 const users = useSelector((state) => state.users.list);
  console.log(users,"first")
  const[isDelete,setIsDelete]=useState(false)
  const [id,setiD]=useState("")
  const navigate=useNavigate()
  const handleModal=(id)=>{
   setiD(id)
   setIsDelete(true)
}
  return (
    <div 
    className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isDelete && "bg-opacity-50 backdrop-blur-lg z-40"}`}

    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Full Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-4 py-4">{user.id}</td>
              <td className="flex items-center px-4 py-4 text-gray-900 dark:text-white">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.avatar}
                  alt={`${user.name}'s profile`}
                />
                <div className="ml-3">
                  <div className="text-base font-semibold">
                    {user.first_name + ' ' + user.last_name}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">{user.email}</td>
              <td className="px-4 py-4 flex flex-wrap gap-2">
               <Button  
               onClick={()=>handleModal(user.id)}
               className="bg-red-500 hover:bg-red-600"    
              >  
                 Delete
               </Button>
               <Button  
            onClick={()=>navigate(`/user/add/${user.id}`)}
               className="bg-blue-500"    
              >  
                  Edit
               </Button>
    
    
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDelete && <DeleteModal setIsDelete={setIsDelete} id={id}/>}
    </div>
  );
};

export default TableList;
