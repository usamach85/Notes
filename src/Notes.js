import React, { Component } from "react";

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.itemToBeEdited ? props.itemToBeEdited.name : "",
      price: props.itemToBeEdited ? props.itemToBeEdited.price : "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    if (this.props.itemToEdit) {
      this.titleInput.value = this.props.itemToEdit.name;
      this.bodyInput.value = this.props.itemToEdit.price;
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.itemToEdit !== this.props.itemToEdit &&
      this.props.itemToEdit
    ) {
      this.titleInput.value = this.props.itemToEdit.name;
      this.bodyInput.value = this.props.itemToEdit.price;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    // Add validation to check for empty fields
    if (!this.titleInput.value.trim() || !this.bodyInput.value.trim()) {
      alert("Both fields are required.");
      return;
    }

    if (this.props.itemToEdit) {
      // If itemToEdit exists, call the onEditSubmit method to update the existing note
      this.props.onEditSubmit(
        this.titleInput.value,
        this.bodyInput.value,
        this.props.itemToEdit.name // Pass the original name as a parameter
      );
    } else {
      // Otherwise, call the onAdd method to create a new note
      this.props.onAdd({
        name: this.titleInput.value,
        price: this.bodyInput.value,
        createdDate: new Date().toLocaleDateString(),
      });
    }
    this.titleInput.value = "";
    this.bodyInput.value = "";
    this.props.onClose();
  }

  onClose(event) {
    event.preventDefault();
    this.props.onClose();
    if (this.props.itemToView) {
      this.props.clearView();
    }
  }

  render() {
    const { itemToView } = this.props; 
    const isViewMode = !!itemToView; 

    return (
      <div className="row">
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-12">
            <h3 className="mb-2">Add Notes</h3>
            <input
            className="input-title"
              placeholder="Title"
              ref={(titleInput) => (this.titleInput = titleInput)}
              defaultValue={itemToView ? itemToView.name : ""} 
              readOnly={isViewMode}
            />
          </div>
          <div className="col-12 note-col">
            <textarea
              className="input-note"
              placeholder="Note"
              ref={(bodyInput) => (this.bodyInput = bodyInput)}
              defaultValue={itemToView ? itemToView.price : ""}
              readOnly={isViewMode} 
            />
          </div>
          {!isViewMode && <button className="btn button-add">Save</button>}{" "}
          <button className="btn button-close " onClick={this.onClose}>
            Close 
          </button>
        </div>
      </form>
      </div>
    );
  }
}

export default Notes;
