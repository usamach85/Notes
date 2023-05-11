import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const TableWithSearch = (props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(props.data);
  const { handleSearch, onAddNotesClick, handleEdit, handleDelete } = props;

  useEffect(() => {
    let newData = [...props.data];
    if (sortBy === "name") {
      if (sortOrder === "asc") {
        newData.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        newData.sort((a, b) => b.name.localeCompare(a.name));
      }
    } else if (sortBy === "createdDate") {
      if (sortOrder === "asc") {
        newData.sort(
          (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        );
      } else {
        newData.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
      }
    }
    setSortedData(newData);
  }, [sortBy, sortOrder, props.data]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(name, date);
  };

  return (
    <div>
      <h1 className="heading">Notes List</h1>
      <div className="row">
        <div
          className="search-container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="col-5">
              <input
                type="text"
                placeholder="Search by Name..."
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="col-2">
              <button onClick={handleSearchClick}>Search</button>
            </div>
            <div>
              <div className="col-5 sorting ">
                <label>Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="createdDate">Created Date</option>
                  <option value="name">Title</option>
                </select>

                <div>
                  <label>Order:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 btn-add">
            <button onClick={onAddNotesClick}>Add Notes</button>
          </div>
        </div>
        <div className="col-12 table">
          <table>
            <thead>
              <tr>
                <th className="createdDate">Created Date</th>
                <th className="title">Name</th>
                <th className="body">Notes</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.createdDate}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td>
                    <button
                      className="mx-2"
                      onClick={() => props.handleView(row)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="mx-2" onClick={() => handleEdit(row)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="mx-2"
                      onClick={() => handleDelete(row.name)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableWithSearch;
