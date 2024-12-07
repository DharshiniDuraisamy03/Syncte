// TableView.js
import React, { useRef, useEffect, useState } from "react";
import user1 from "./images/user1.png";
import DownloadIcon from "./images/Dropdown.png";

const TableView = ({
  employees,
  selectedEmployees,
  onSelectAll,
  onSelectChange,
}) => {
  const [showOptions, setShowOptions] = useState({});
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowOptions({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOptions = (id) => {
    setShowOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" onChange={onSelectAll} />
            <span className="nameheader">Name</span>
          </th>
          <th>Employee ID</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Teams</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr
            key={employee.id}
            className={selectedEmployees[employee.id] ? "selected-row" : ""}
          >
            <td>
              <input
                type="checkbox"
                checked={!!selectedEmployees[employee.id]}
                onChange={() => onSelectChange(employee.id)}
              />
              <img src={user1} alt="Profile" className="profile-pic" />
              <span>{employee.name}</span>
            </td>
            <td>{employee.employee_id}</td>
            <td>{employee.phone}</td>
            <td>{employee.role.mainrole}</td>
            <td>{employee.status}</td>
            <td>{employee.Teams.join(", ")}</td>
            <td>
              <button
                ref={buttonRef}
                onClick={() => toggleOptions(employee.id)}
              >
                <img src={DownloadIcon} alt="Options" />
              </button>
              {showOptions[employee.id] && (
                <div className="options-menu">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
