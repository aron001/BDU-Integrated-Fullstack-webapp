import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import SchoolAdvert from "../SchoolAdvert/SchoolAdvert";
import { useSelector, useDispatch } from "react-redux";
import "./SchoolAdverts.css";
import { useParams } from "react-router-dom";
import { PostsData } from "../../Data/PostsData";
import { getAllAdverts } from "../../actions/AdvertActions";


const SchoolAdverts = ({location}) => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { adverts, loading } = useSelector((state) => state.advertReducer);

  useEffect(() => {
    dispatch(getAllAdverts());
  }, []);
  if(!adverts) return 'No Advertisements Found';
  //if(params.id) PostsData = PostsData.filter((post)=> post.userId===params.id)
  return (
    <div className="SchoolAdverts">
     {loading? 
     "Fetching Advertisements..."
     :adverts?.map((advert, id) => {
            return <SchoolAdvert data={advert} key={id} location={location}/>;
          })}
    </div>
  );
};

export default SchoolAdverts;
