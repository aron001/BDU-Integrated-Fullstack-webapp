import React, { useEffect } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { getProfileUser } from "../../actions/UserAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import NavBara from '../../components/Mynavbar/Navbar'
const Profile = () => {
  const dispatch = useDispatch();
  let { profileUserData } = useSelector((state) => state.authReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileUser(id));
  }, [id]);

  return (
    <>
      <div>
        <NavBara/>
      </div>
      <div className="Profile">
        <ProfileLeft profileUserData={profileUserData} />
        <div className="Profile-center">
          <ProfileCard profUserData={profileUserData} />
          <PostSide location="profilePage" />
        </div>
        <RightSide />
      </div>
    </>
  );
};

export default Profile;
