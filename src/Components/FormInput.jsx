import React from "react";

const FormInput = ({ label, name, onChange, type, classNames, value }) => {
  
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <label className="text-xl">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={label}
        className="w-96 outline-none rounded-xl h-10 text-black pl-2 bg-teal-50" 
      />
    </div>
  );
};

export default FormInput;
