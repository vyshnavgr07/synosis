import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../redux/userSlice";
import PropTypes from "prop-types";
const DeleteModal = ({ setIsDelete, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteUser(id));
    setIsDelete(false);
    navigate("/");
  };
  return (
    <div
      id="deleteModal"
      className="fixed bg-gray-200 opacity-90 inset-0 z-50 flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
        <p className="mb-4 text-gray-500">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Button onClick={() => setIsDelete(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
    setIsDelete: PropTypes.func.isRequired, 
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  };