import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdvertCategory = ({data, minimize, currentCategory}) => {
  const navigate  = useNavigate();

  // if(currentCategory?.name === "School Advert") navigate("/school")
  // if(currentCategory?.name === "Found Things") navigate("/found") 
  // if(currentCategory?.name === "Lost Things") navigate("/lost")
  useEffect(()=>{
  if(currentCategory?.name === "School Advert") navigate(`/advert/${"school"}`)
  if(currentCategory?.name === "Found Things") navigate(`/advert/${"found"}`) 
  if(currentCategory?.name === "Lost Things") navigate(`/advert/${"lost"}`)
  },[currentCategory])

  
  return (
    <>
    <div className="follower category">
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
        />
        {minimize ? ("") :(<div className="name" style={{fontSize: '0.8rem'}}>
          <span>{data?.name}</span>
        </div>)}
     
    </div>
    <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
  </>
  )
}

export default AdvertCategory