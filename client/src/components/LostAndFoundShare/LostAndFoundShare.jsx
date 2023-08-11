import React, { useState, useRef } from "react";
import "./LostAndFoundShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadLostAndFoundImage, uploadLostAndFoundPost } from "../../actions/LostAndFoundUploadActions";

const LostAndFoundShare = ({ location }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.lfReducer.uploading);
  const [image, setImage] = useState(null);
  const lostAndFoundText = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle lostAndFound upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //lostAndFound data
    const newLostAndFound = {
      userId: user._id,
      lostAndFoundText: lostAndFoundText.current.value,
      status: "unSolved",
      isLostOrFound: location === "Lost Page" ? "lost" : "found"
    };

    // if there is an image with lostAndFound
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newLostAndFound.image = fileName;
      console.log(newLostAndFound);
      try {
        dispatch(uploadLostAndFoundImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadLostAndFoundPost(newLostAndFound));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    lostAndFoundText.current.value = "";
  };
  return (
    <div className="LostAndFoundShare">
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
          placeholder={
            location === "Lost Page"
              ? "Lost Something ? Write some description about the things you lost"
              : location === "Found Page"
              ? "Found Something ? Write some description about the things you Found"
              : ""
          }
          required
          ref={lostAndFoundText}
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
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
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

export default LostAndFoundShare;
