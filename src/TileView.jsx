// TileView.js
import React from "react";
import user1 from "./images/user1.png";
import DownloadIcon from "./images/Dropdown.png";

const TileView = ({ employees, selectedEmployees, onSelectChange }) => {
  return (
    <div className="tile-view">
      {employees.map((employee) => (
        <div key={employee.id} className="employee-tile">
          <img src={user1} alt="Profile" className="profile-pic" />
          <span>{employee.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TileView;
