import React, { useState, useRef } from "react";
import "./SchoolAdvertShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { updateAdvertPost, uploadAdvertImage, uploadAdvertPost } from "../../actions/AdvertUploadActions";

const SchoolAdvertShare = ({location, setUpdateModalOpened, data}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.advertReducer.uploading);
  const [image, setImage] = useState(null);
  const advertText = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [currentAdText, setCurrentAdText] = useState(data?.advertText);
  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle advert upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //advert data
    const newAdvert = {
      userId: user._id,
      advertText: advertText.current.value,
     // userData: user,
    };

    // if there is an image with advert
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newAdvert.image = fileName;
      console.log(newAdvert);
      try {
        dispatch(uploadAdvertImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    location === "new" && dispatch(uploadAdvertPost(newAdvert));
    location === "update" &&  updateAdvert(e,newAdvert);
    resetShare();
  };

  function updateAdvert(e, newAdvert) {
    e.preventDefault();
    dispatch(updateAdvertPost(data._id,newAdvert));
    setUpdateModalOpened(()=>false)
  }

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    advertText.current.value = "";
  };
  return (
    <div className="SchoolAdvertShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
      <div>
        <textarea
          style={{
            height: "6rem",
            maxWidth: "100%",
            minWidth: "10rem",
            maxHeight: "10rem",
            minHeight: "6rem",
            border: "1px dotted",
            borderRadius: "1rem",
            padding: ".5rem",
          }}
          type="text"
          placeholder="Write Advertisements here... "
          required
          ref={advertText}
          value={currentAdText}
          onChange={(e)=>setCurrentAdText(()=>e.value)}
        />
        <div className="postOptions">
          <div
            title="pick an image"
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={false}
          >
            {(location === "new" && "Share" || location==="update" && "Update")}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolAdvertShare;
