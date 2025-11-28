import React from 'react';

const Buttons = ({ name }) => {
  return (
    <button
      className="
        px-4 py-1 m-2 
        rounded-sm 
        bg-gray-300 
        hover:bg-gray-400 
        active:bg-gray-500 
        transition
      "
    >
      {name}
    </button>
  );
};

export default Buttons;
