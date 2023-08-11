import React from 'react'
import LostAndFounds from '../LostAndFounds/LostAndFounds'
import LostAndFoundShare from '../LostAndFoundShare/LostAndFoundShare'
import "./LostAndFoundSide.css"

const LostAndFoundSide = ({location}) => {
  return (
    <div className="LostAndFoundSide">
      <LostAndFoundShare location = {location} />
      <LostAndFounds location ={location}/>
    </div>
  )
}

export default LostAndFoundSide