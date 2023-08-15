import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="">
      <nav className="flex flex-row gap-5 h-14 items-center font-semibold text-2xl list-none">
        <li className="">
          <Link to="/createalbum">Create Album</Link>
        </li>
        <li className="">
          <Link to="/">Home</Link>
        </li>
        <li>
          {currentUser ? (
            <button
              onClick={async (e) => {
                e.preventDefault();
                await logout();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>{currentUser?.userName}</li>
        <li>{currentUser?.emailAddress}</li>
      </nav>
    </div>
  );
};

export default NavBar;
