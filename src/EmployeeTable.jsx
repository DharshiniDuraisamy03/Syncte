import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import user1 from "./images/user1.png";
import DownloadIcon from "./images/Dropdown.png";
import mockData from "./mockData";
import closeIcon from "./images/add.png";
import TileView from "./images/Filter (1).png";
import TableView from "./images/Button 02.png";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState("table");
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showOptions, setShowOptions] = useState({});
  const buttonRef = useRef(null); // Added buttonRef
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Make sure this state exists

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const employeesPerPage = view === "table" ? 10 : 9;

  useEffect(() => {
    // Set the employees state with mock data
    setEmployees(mockData.users);
  }, []);

  const showTableView = () => setView("table");
  const showTileView = () => setView("tile");

  const handleSelectChange = (id) => {
    setSelectedEmployees((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    const areAllSelected = currentEmployees.every(
      (employee) => selectedEmployees[employee.id]
    );

    const updatedSelection = currentEmployees.reduce((acc, employee) => {
      acc[employee.id] = !areAllSelected;
      return acc;
    }, {});

    setSelectedEmployees(updatedSelection);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  console.log("===", employees);

  return (
    <div>
      <div className="col2">
        <h3 className="leftcontrol">Employees</h3>
        <div className="btndiv">
          <button
            onClick={showTableView}
            className={`view-button ${view === "table" ? "active" : ""}`}
          >
            <img src={TableView} alt="TileView" className="TileViewIcon" />
          </button>
          <button
            onClick={showTileView}
            className={`view-button ${view === "tile" ? "active" : ""}`}
          >
            <img src={TileView} alt="TileView" className="TileViewIcon" />
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div>
          <table className="employee-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      currentEmployees.length > 0 &&
                      currentEmployees.every(
                        (employee) => selectedEmployees[employee.id]
                      )
                    }
                  />
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
              {currentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className={
                    selectedEmployees[employee.id] ? "selected-row" : ""
                  }
                >
                  <td className="checkbox-name-container">
                    <input
                      type="checkbox"
                      checked={!!selectedEmployees[employee.id]}
                      onChange={() => handleSelectChange(employee.id)}
                    />
                    <div className="profile-container">
                      <img
                        src={employee.image}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <ul className="namecoloum">
                        <li className="namecol">{employee.name}</li>
                        <li className="email">{employee.email}</li>
                      </ul>
                    </div>
                  </td>
                  <td>{employee.employee_id}</td>
                  <td>9876543218</td>
                  <td>
                    {employee.role.mainrole} - {employee.role.subrole}
                  </td>
                  <td>{employee.status}</td>
                  <td>{employee.Teams.join(", ")}</td>
                  <td>
                    <button
                      ref={buttonRef}
                      onClick={() => toggleOptions(employee.id)}
                      className="three-dot-btn"
                    >
                      <img
                        src={DownloadIcon}
                        alt="Icon"
                        className="button-icon"
                      />
                    </button>

                    {showOptions[employee.id] && (
                      <div className="options-menu">
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>Flag</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="tile-view">
          {currentEmployees.map((employee) => (
            <div
              key={employee.id}
              className={`employee-tile ${
                selectedEmployees[employee.id] ? "selected-tile" : ""
              }`}
              onClick={() => openModal(employee)} // Open modal with employee data
            >
              {/* Employee details */}
              <div className="employee_id">
                <img
                  src={employee.image}
                  alt="Profile"
                  className="profile-pic"
                />
                <div className="tileView1">
                  <p className="tileViewId">{employee.employee_id}</p>
                  <p>
                    <button
                      ref={buttonRef}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent onClick on parent
                        toggleOptions(employee.id);
                      }}
                      className="three-dot-btn"
                    >
                      <img
                        src={DownloadIcon}
                        alt="Icon"
                        className="button-icon"
                      />
                    </button>

                    {showOptions[employee.id] && (
                      <div className="options-menu">
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>Flag</button>
                      </div>
                    )}
                  </p>
                </div>
              </div>
              <div className="employee_id">
                <p className="name">{employee.name}</p>
                <p className="email">{employee.email}</p>
              </div>
              <div className="employee_id">
                <p className="role">{employee.role.mainrole}</p>
                <p className="subrole">{employee.role.subrole}</p>
              </div>
              <div className="employee_id">
                <p className="teams">{employee.Teams.join(", ")}</p>
                <p className="status">{employee.status}</p>
              </div>
            </div>
          ))}
          <div className="pagination-wrapper">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>

          {/* Modal with Enlarged Tile */}
          {isModalOpen && selectedEmployee && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-box enlarged-tile"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={closeModal} className="iconfull">
                  <img src={closeIcon} alt="Icon" className="button-iconfull" />
                </button>
                <div className="fullpicname">
                  <img
                    src={selectedEmployee.image}
                    alt="Profile"
                    className="profile-picfull"
                  />
                  <div>
                    <div className="namefull">{selectedEmployee.name}</div>
                    <p className="statusfull">{selectedEmployee.status}</p>
                  </div>
                </div>
                <div className="employee-info">
                  <div className="employee-id">
                    <p className="label">Role</p>
                    <p className="value">{selectedEmployee.role.mainrole}</p>
                    <p className="value">{selectedEmployee.role.subrole}</p>
                  </div>

                  <div className="employee-id">
                    <p className="label">Local Time</p>
                    <p className="value">9:17 AM local time</p>
                  </div>
                  <div className="employee-id">
                    <p className="label">Location</p>
                    <p className="value">Tamilnadu, India</p>
                  </div>
                </div>
                <div className="employee-info">
                  <div className="employee-id">
                    <p className="label">Mobile</p>
                    <p className="value">{selectedEmployee.phone}</p>
                  </div>
                  <div className="employee-id">
                    <p className="label">Employee ID</p>
                    <p className="value">{selectedEmployee.employee_id}</p>
                  </div>
                  <div className="employee-id">
                    <p className="label">Email</p>
                    <p className="value">{selectedEmployee.email}</p>
                  </div>
                </div>
                <div className="employee-info">
                  <div className="employee-id">
                    <p className="label">Product</p>
                    <p className="value">Google Cloud</p>
                  </div>
                  <div className="employee-id">
                    <p className="label">Teams</p>
                    <p className="value">{selectedEmployee.Teams}</p>
                  </div>

                  <div className="employee-id">
                    <p className="label">Start Date</p>
                    <p className="value">Jul 3, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
