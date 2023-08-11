import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
//import LogoSearch from '../LogoSearch/LogoSearch'

const ProfileLeft = (profileUserData) => {
  return (
    <div className="ProfileSide">
        {/*<LogoSearch/>*/}
        <InfoCard profileUserData={profileUserData}/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft