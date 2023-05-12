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

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Add New Note</h1>
          </div>
          <div className="card-body">
          <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center">
          <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-12 text-center">
            
                  <input
                    className="form-control input-add"
                    placeholder="Title"
                    ref={(titleInput) => (this.titleInput = titleInput)}
                    defaultValue={itemToView ? itemToView.name : ""}
                    readOnly={isViewMode}
                  />
                </div>
                <div className="col-12 note-col text-center">
                  <textarea
                    className="form-control input-note"
                    placeholder="Note"
                    ref={(bodyInput) => (this.bodyInput = bodyInput)}
                    defaultValue={itemToView ? itemToView.price : ""}
                    readOnly={isViewMode}
                  />
                </div>
                <div className="col-12 text-center d-flex justify-content-center">
                  {!isViewMode && (
                    <button className="btn btn-add btn-submit">Save</button>
                  )}
                  <button className="btn btn-secondary btn-cancel" onClick={this.onClose}>
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
          </div>
        </div>
      </section>
   
    );
  }
}

export default Notes;
