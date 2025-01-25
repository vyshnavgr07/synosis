import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../components/TextField";
import { addUser, editUser } from "../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    if (id) {
      const userToEdit = users.find((user) => user.id === parseInt(id));
      if (userToEdit) {
        setFirstName(userToEdit.first_name);
        setLastName(userToEdit.last_name);
        setEmail(userToEdit.email);
        setAvatar(userToEdit.avatar || "");
      }
    }
  }, [id, users]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstNameError("");
    setEmailError("");

    let isValid = true;

    const val = validateEmail(email);
    if (!val) {
      setEmailError("Email is not valid");
      isValid = false;
    }

    if (firstName.length < 3) {
      setFirstNameError("First name must contain at least 3 letters");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      avatar,
    };

    if (id) {
      dispatch(editUser({ id: parseInt(id), ...userData }));
    } else {
      dispatch(addUser({ id: users.length + 1, ...userData }));
    }
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {id ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <p className="text-red-500">{firstNameError}</p>}
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
          {emailError && <p className="text-red-500">{emailError}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {avatar && (
              <img
                src={avatar}
                alt="Avatar Preview"
                className="mt-2 w-32 h-32 object-cover border-2 border-gray-300"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-200"
          >
            {id ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
