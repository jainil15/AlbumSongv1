import React from "react";
import "./RippleButtonCss.css";

const RippleButton = () => {
  return (
    <button className="text-2xl p-2 rounded-xl after:rounded-full custom-button hover:border-2 hover:transition-all active:transition-all after:bg-violet-500 bg-violet-500 hover:bg-slate-50 hover:text-violet-700  transition-all hover:border-violet-600  border-2 border-transparent">Login
    </button>
  );
};

export default RippleButton;
