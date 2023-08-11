import React, { useEffect, useState } from "react";
import "./SchoolAdvert.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/Like.png";
import NotLike from "../../img/Notlike.png";
import { likePost } from "../../api/PostsRequests";
import { deletePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import menuIcon from "../../img/menu.png";
import DeleteModal from "../DeleteModal/DeleteModal";
import AdvertShareModal from "../AdvertShareModal/AdvertShareModal";

const SchoolAdvert = ({ data }) => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [postOption, setPostOption] = useState(false);
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="SchoolAdvert">
      <div className="detail">
        <div>
          <img
            src={
              publicFolder + data.creatorData[0].profilePicture ?
              publicFolder + data.creatorData[0].profilePicture :
              publicFolder + "defaultProfile.png"
            }
            alt="profile"
            className="followerImage"
          />
          <div className="name">
          <Link
              to={`/profile/${data?.creatorData[0]._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <span title="click to go to user profile">@{data?.creatorData[0].username}</span>  
          </Link>
          </div>
        </div>
        {user?.isAdmin && (
          
            <div>
              <img
                src={menuIcon}
                alt=""
                title={postOption? "hide options" : "show options"}
                style={{ cursor: "pointer", height: "1.5rem", width: "1.5rem" }}
                onClick={() => setPostOption((postOption) => !postOption)}
              />

            <div style={{display: postOption? "flex" : "none", gap:".5rem"}}>
            <button  className="button" onClick={()=> setUpdateModalOpened(true)}>
                Update
              </button>
              <button style={{background: "red"}}  className="button" onClick={() => setDelModalOpened(true)}>
                delete
              </button>
            </div>
            <DeleteModal location={"advert"} delModalOpened={delModalOpened} setDelModalOpened={setDelModalOpened} data={data} user={user}/>
            <AdvertShareModal updateModalOpened={updateModalOpened} setUpdateModalOpened={setUpdateModalOpened} data={data}/>
          </div>
        )}
      </div>

      <div className="description">
        <p>{data?.advertText}</p>
      </div>

      <img
        src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
    </div>
  );
};

export default SchoolAdvert;
