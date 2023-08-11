import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createChatPair } from "../../actions/ChatActions.js";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal"
const ProfileCard = ({ profUserData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { allChatPairs } = useSelector((state) => state.chatReducer);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const [chatStart, setChatStart] = useState({});
  const [modalOpened, setModalOpened] = useState(false);

  const makeChatPair = async () => {
    const senderAndReceiver = {
      senderId: user._id,
      receiverId: profileUserId,
    };
    setChatStart(() => senderAndReceiver);
    //after 800 seconds of creating chat this will navigate to chat page.
    setTimeout(() => {
      navigate("/chat");
    }, 800) 
  };

  useEffect(() => {
    const fetchProfileUser = () => {
      setProfileUser(profUserData);
    };
    fetchProfileUser();
  }, [profUserData]);

  useEffect(() => {
    try {
      if (chatStart.senderId && chatStart.receiverId !== null) {
        dispatch(createChatPair(chatStart));
      }
    } catch (error) {
      console.log("error from profile card try catch", error);
    }
  }, [chatStart]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileUser?.coverPicture
              ? serverPublic + profileUser.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            profileUser?.profilePicture
              ? serverPublic + profileUser.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileUser?.firstname} {profileUser?.lastname}
        </span>
        <span className = 'modalWith'>
          {profileUser?.worksAt ? profileUser.worksAt : "Write about yourself"}
          <div className = 'modal'>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileUser?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileUser?.following?.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          <>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {posts.filter((post) => post.userId === profileUser?._id).length}
              </span>
              <span>Posts</span>
            </div>{" "}
          </>
        </div>
        <hr />
      </div>
      {user._id !== profileUser?._id && (
        <span>
          <Link
            to={""}
            onClick={() => makeChatPair()}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Send Message
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
