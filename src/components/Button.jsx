import React from 'react';


const Button = ({ type = 'button', onClick, children, className = '', disabled = false }) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-lg focus:outline-none transition-colors ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white' } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
