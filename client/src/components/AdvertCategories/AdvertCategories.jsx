import React, { useState } from 'react'
import AdvertCategory from '../AdvertCategory/AdvertCategory';



const AdvertCategories = ({minimize, setMinimize}) => {
    const AdvertCategories = [
        { id: 1, name: "School Advert" },
        { id: 2, name: "Lost Things" },
        { id: 3, name: "Found Things" },
      ];

      const [currentCategory, setCurrentCategory] = useState(null);
  return (
<div className="Advert-container">
            <div className="categoryHeader">
              <div className="categoryText">
                 <h3>Advert Categories</h3>
              </div>
              <div className="menuIcon">
                
              </div>
            </div>

            <hr className='line' style={{ width: "100%", border: "0.1px solid gray" }} />

            <div className="Advert-list">
              {AdvertCategories.map((category, id) => (
                <div onClick={() => setCurrentCategory(category)}>
                  <AdvertCategory
                    key={id}
                    data={category}
                    
                    currentCategory={currentCategory}
                  />
                  
                </div>
              ))}
            </div>
          </div>
            )
}

export default AdvertCategories