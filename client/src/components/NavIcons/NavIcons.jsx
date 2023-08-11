import React from "react";

import Home from "../../img/homee.png";
import Advert from "../../img/advert.png";
import Comment from "../../img/comment.png";
import Discussion from "../../img/discussion.png";
import DashBoard from "../../img/dashboard.png"

//import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import "./NavIcons.css";
import { useSelector } from "react-redux";

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="navIcons">
      {user.isAdmin && 
        <Link to="../adminDashboard">
        <img src={DashBoard} alt="" title="Admin Dashboard"/>
      </Link>
      }
      
      <Link to="../home">
        <img src={Home} alt="" title="Home" />
      </Link>
      <Link to="../discussion">
      <img src={Discussion} alt="" title="Q&A page" />
      </Link>
      <Link to="../advert">
        <img src={Advert} alt="" title="Advert Page" />
      </Link>
      <Link to="../chat">
        <img src={Comment} alt="" title="Chatting"/>
      </Link>
    </div>
  );
};

export default NavIcons;
