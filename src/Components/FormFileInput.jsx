import React from "react";

const FormFileInput = ({ selectFile, onChange, label, classNames }) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <span className="text-xl">{label}</span>
      <label>
        
        <input
          type="file"
          className="none"
          style={{ display: "none", margin: "10px" }}
          onChange={onChange}
        />
        <span className="flex flex-row cursor-pointer">
          <span className="flex items-center p-2.5 hover:bg-gray-500 rounded-l-xl border-l-2 border-t-2 border-b-2 border-gray-400 ">{"Select File"}</span>
          <span className="flex items-center truncate text-ellipsis overflow-hidden w-72 rounded-r-xl bg-white p-1 border-r-2 border-t-2 border-b-2 text-black">
            {selectFile || "No File Selected"}
          </span>
        </span>
      </label>
    </div>
  );
};

export default FormFileInput;
