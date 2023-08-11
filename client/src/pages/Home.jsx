import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import NavBar from "../components/NavBar/NavBar";
import NavBara from '../components/Mynavbar/Navbar'
const Home = () => {
  return (
    <>
      <div className="NavBar">
        <NavBara />
      </div>
      <div className="Home">
        <ProfileSide />
        <PostSide />
        <RightSide />
      </div>
    </>
  );
};

export default Home;
