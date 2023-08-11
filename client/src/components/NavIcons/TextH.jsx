import React from "react";

import { Link } from "react-router-dom";
import "./NavIcons.css";
import { useSelector } from "react-redux";
import { logout } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
const NavIcons = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleLogOut = ()=> {
    dispatch(logout())
  }
  return (
    <div className="navIcons">

      <Link to="../home">
        Home
      </Link>
      {user.isAdmin && 
        <Link className = 'Admin' to="../adminDashboard">
        Admin
      </Link>
      }
      <Link to="../discussion">
       Q&A
      </Link>
      <Link to="../advert">
        Advert
      </Link>
      <Link to="../chat">
        chat
      </Link>
      <button className = 'button1' onClick={handleLogOut}>Log Out</button>
      
    </div>
  );
};

export default NavIcons;
