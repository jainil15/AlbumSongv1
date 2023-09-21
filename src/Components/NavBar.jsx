import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="bg-slate-700">
      <nav className="mr-2 ml-2 h-14 flex items-center justify-between p-1">
        <div>Logo</div>
        <ul className="flex font-light flex-row gap-2 items-center h-full text-xl list-none justify-end">
          {currentUser && (
            <li className=" flex items-center hover:bg-slate-500 h-full rounded-lg p-2">
              <Link to="/createalbum" className="">
                Create Album
              </Link>
            </li>
          )}
          <li className=" flex items-center hover:bg-slate-500 h-full rounded-lg p-2">
            <Link to="/">Home</Link>
          </li>

          <li className=" flex items-center gap-1 h-full rounded-lg">
            {currentUser ? (
              <>
                <li className="flex items-center flex-col text-lg w-56 whitespace-nowrap bg-slate-900 rounded-md pl-2 pr-1">
                  {currentUser.userName && (
                    <li className="text-ellipsis overflow-hidden w-full flex">
                      username: {currentUser.userName}
                    </li>
                  )}
                  {currentUser.emailAddress && (
                    <li className="text-ellipsis overflow-hidden w-full">
                      emailid: {currentUser.emailAddress}
                    </li>
                  )}
                </li>
                <li className="flex items-center hover:bg-slate-500 h-full rounded-lg p-2">
                  <button
                    className=""
                    onClick={async (e) => {
                      e.preventDefault();
                      await logout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <Link to="/login" className="hover:bg-slate-500 h-full rounded-lg p-2 flex items-center">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
