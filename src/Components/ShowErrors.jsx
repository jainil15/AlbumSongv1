import React from "react";

const ShowErrors = ({ errorsMessages }) => {
  return (
    <div className="flex flex-col text-red-600 ">
      {Object.entries(errorsMessages).map(([fields, errors]) => (
        <ol className="list-disc">
          {errors.map((error) => (
            <li>{errors}</li>
          ))}
        </ol>
      ))}
    </div>
  );
};

export default ShowErrors;
