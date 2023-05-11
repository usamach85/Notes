import React, { Component } from "react";
import "./App.css";
import TableWithSearch from "./main";
import Notes from "./Notes";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(localStorage.getItem("items")) || [],
      showAddNewItemPage: false,
      itemToEdit: null,
      itemToView: null,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.toggleAddNewItemPage = this.toggleAddNewItemPage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleSearch = (name, date) => {
    const filteredItems = this.state.items.filter(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) &&
        item.createdDate.includes(date)
    );

    this.setState({ items: filteredItems });
  };

  componentWillMount() {
    const items = this.getItems();
    this.setState({ items });
  }

  handleView = (item) => {
    this.setState({
      itemToView: item,
      showAddNewItemPage: true,
    });
  };
  getItems() {
    return this.state.items;
  }

  onAdd(item) {
    this.setState({ items: [...this.state.items, item] });
  }

  onDelete(name) {
    const items = this.getItems();

    const filteredItems = items.filter((item) => {
      return item.name !== name;
    });

    this.setState({ items: filteredItems });
    localStorage.setItem("items", JSON.stringify(filteredItems));
  }

  onEditSubmit(name, price, originalName) {
    let items = this.getItems();

    items = items.map((item) => {
      if (item.name === originalName) {
        item.name = name;
        item.price = price;
      }

      return item;
    });

    this.setState({ items });
  }

  clearView = () => {
    this.setState({
      itemToView: null,
    });
  };

  toggleAddNewItemPage() {
    this.setState((prevState) => ({
      showAddNewItemPage: !prevState.showAddNewItemPage,
      itemToEdit: null,
    }));
  }

  handleEdit = (item) => {
    this.setState({
      itemToEdit: item,
      showAddNewItemPage: true,
      itemToView: null,
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.showAddNewItemPage && (
          <TableWithSearch
            onAddNotesClick={this.toggleAddNewItemPage}
            data={this.state.items}
            handleEdit={this.handleEdit}
            handleView={this.handleView}
            handleDelete={this.onDelete}
            handleSearch={this.handleSearch}
          />
        )}
        {this.state.showAddNewItemPage && (
          <Notes
            onAdd={this.onAdd}
            onClose={this.toggleAddNewItemPage}
            itemToEdit={this.state.itemToEdit}
            itemToView={this.state.itemToView}
            onEditSubmit={this.onEditSubmit}
            clearView={this.clearView}
          />
        )}
      </div>
    );
  }
}

export default App;
