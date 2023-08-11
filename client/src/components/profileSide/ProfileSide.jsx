import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
//import LogoSearch from '../LogoSearch/LogoSearch'
import './ProfileSide.css'
import ProfileCardHome from '../ProfileCard/profileCardHome'
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      {/*<LogoSearch/>*/}  
        <ProfileCardHome/>
        <FollowersCard/>
    </div>
    )
}

export default ProfileSide