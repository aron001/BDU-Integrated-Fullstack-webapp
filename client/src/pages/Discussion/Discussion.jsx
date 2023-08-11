import React, { useEffect, useState } from "react";
import "./Discussion.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import menuIcon from "../../img/menu.png";
import Category from "../../components/Category/Category";
import DiscussionBox from "../../components/DiscussionBox/DiscussionBox";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../api/QARequests";
import NavBara from '../../components/Mynavbar/Navbar'
const Discussion = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  // const Categories = [
  //   { id: 1, name: "All" },
  //   { id: 2, name: "Computer Engineering" },
  //   { id: 3, name: "Electrical Engineering" },
  //   { id: 4, name: "Mechanical Engineering" },
  //   { id: 5, name: "Chemical Engineering" },
  //   { id: 6, name: "Industrial Engineering" },
  //   { id: 7, name: "Automotive Engineering" },
  // ];

  const [currentCategory, setCurrentCategory] = useState(null);
  const [minimize, setMinimize] = useState(false);
  return (
    <>
      <NavBara/>
      <div
        
        className="Discussion"
      >
        {/* Left side */}
        <div className="Left-side-discussion">
          <div className="Discussion-container">
            <div className="categoryHeader">
              <div className="categoryText">
                
              </div>
              <div className="menuIcon">
              </div>
            </div>
            <div className="Discussion-list">
              {categories.map((category, id) => (
                <div onClick={() => setCurrentCategory(category)}>
                  <Category key={id} data={category} minimize={minimize} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right side discussion*/}
        <div className="Right-side-discussion">
          <DiscussionBox category={currentCategory}/>
        </div>
      </div>
    </>
  );
};

export default Discussion;
