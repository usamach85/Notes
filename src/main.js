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
    <div className="container-fluid">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Notes List</h1>
          </div>
          <div className="card-body">
            <div className="row justify-content-between align-items-center mb-3">
              <div className="col-12 col-sm-3 col-md-3 d-flex align-items-center justify-content-md-start justify-content-center">
                <div className="search-field">
                  <div class="input-group rounded">
                    <input
                      type="text"
                      placeholder="Search"
                      value={name}
                      onChange={handleNameChange}
                      className="form-control"
                    />
                    <span
                      className="input-group-text border-0"
                      id="search-addon"
                      onClick={handleSearchClick}
                    >
                      <i class="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 align-items-center justify-content-md-start justify-content-center">
                <div className="data-sorting">
                  <div className="form-group">
                    <label>Sort By:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="form-select"
                    >
                      <option value="">None</option>
                      <option value="createdDate">Created Date</option>
                      <option value="name">Title</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Order:</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="form-select"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-2 col-md-2 d-flex justify-content-md-end justify-content-center">
                <button
                  className="btn btn-primary btn-add"
                  onClick={onAddNotesClick}
                >
                  Add Notes
                </button>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 w-100">
                <table className="table table-light table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th className="title">Name</th>
                      <th className="body">Notes</th>
                      <th className="createdDate">Created Date</th>
                      <th className="action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.price}</td>
                        <td>{row.createdDate}</td>
                        <td>
                          <button
                            className="mx-2"
                            onClick={() => props.handleView(row)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="mx-2"
                            onClick={() => handleEdit(row)}
                          >
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
        </div>
        {/* Cards ends here */}
      </section>
    </div>
  );
};

export default TableWithSearch;
