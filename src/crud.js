import React from "react";
import Notes from "./Notes";
import Item from "./Item";

const AddNewItemPage = ({ onAdd }) => {
  return (
    <React.Fragment>
      <h1>Add New Notes</h1>
      <Notes
        onAdd={this.onAdd}
        onClose={this.toggleAddNewItemPage}
        itemToBeEdited={this.state.itemToBeEdited}
      />
      {/* <Item /> */}
    </React.Fragment>
  );
};

export default AddNewItemPage;
