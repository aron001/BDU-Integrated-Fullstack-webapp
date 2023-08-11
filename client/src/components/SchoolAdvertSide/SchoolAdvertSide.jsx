import React from "react";
import SchoolAdverts from "../SchoolAdverts/SchoolAdverts"
import SchoolAdvertShare from "../SchoolAdvertShare/SchoolAdvertShare";
import "./SchoolAdvertSide.css";
import { useSelector } from "react-redux";

const SchoolAdvertSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="SchoolAdvertSide">
     {user?.isAdmin && <SchoolAdvertShare location={"new"} />}
      <SchoolAdverts />
    </div>
  );
};

export default SchoolAdvertSide;
