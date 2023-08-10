import React from "react";

const FormButton = ({ label, onClick, classNames = "" }) => {
  return (
    <div>
      <button onClick={onClick} className={`bg-teal-700 w-28 border-2 border-transparent rounded-md p-2 hover:bg-teal-50 hover:border-2 hover:border-teal-700 hover:text-black ${classNames}`}>
        {label}
      </button>
    </div>
  );
};

export default FormButton;
