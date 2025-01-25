import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../components/TextField';
import { addUser, editUser } from '../redux/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const AddUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const navigate = useNavigate();
  const { id } = useParams(); 
console.log(id,"fefdeferf")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');


  useEffect(() => {
    if (id) {
      const userToEdit = users.find((user) => user.id === parseInt(id));
      if (userToEdit) {
        setFirstName(userToEdit.first_name);
        setLastName(userToEdit.last_name);
        setEmail(userToEdit.email);
        setAvatar(userToEdit.avatar || ''); 
      }
    }
  }, [id, users]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      avatar
    };

    if (id) {
      dispatch(editUser({ id: parseInt(id), ...userData }));
    } else {
      dispatch(addUser({ id:users.length+1, ...userData }));
    }
    navigate("/user/list");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
    
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          
          {avatar && <img src={avatar} alt="Avatar Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          {id ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
