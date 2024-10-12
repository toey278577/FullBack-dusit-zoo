import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animal_table_cpnt.css"; // Adjust the filename as necessary
import "./animal_type_table_cpnt.css";

export default class UserTable extends Component {
  state = {
    data: [
      { id: 1, username: "User1", password: "Pass1", role: "Admin" },
      { id: 2, username: "User2", password: "Pass2", role: "User" },
      { id: 3, username: "User3", password: "Pass3", role: "Guest" },
    ],
    newUsername: "",
    newPassword: "",
    newRole: "",
    isEditing: false,
    currentItem: null,
  };

  // Add new data
  handleAdd = () => {
    const { data, newUsername, newPassword, newRole } = this.state;
    if (newUsername && newPassword && newRole) {
      const newItem = {
        id: data.length + 1,
        username: newUsername,
        password: newPassword,
        role: newRole,
      };
      this.setState({
        data: [...data, newItem],
        newUsername: "",
        newPassword: "",
        newRole: "",
      });
    }
  };

  // Edit data
  handleEdit = (item) => {
    this.setState({
      isEditing: true,
      currentItem: item,
      newUsername: item.username,
      newPassword: item.password,
      newRole: item.role,
    });
  };

  // Save edited data
  handleSave = () => {
    const { data, currentItem, newUsername, newPassword, newRole } = this.state;
    const updatedData = data.map((item) =>
      item.id === currentItem.id
        ? { ...item, username: newUsername, password: newPassword, role: newRole }
        : item
    );
    this.setState({
      data: updatedData,
      isEditing: false,
      currentItem: null,
      newUsername: "",
      newPassword: "",
      newRole: "",
    });
  };

  // Delete data
  handleDelete = (id) => {
    const updatedData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: updatedData });
  };

  // Handle input changes
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { data, newUsername, newPassword, newRole, isEditing } = this.state;

    return (
      <div className="container mt-3 columz">
        <h2>ตารางข้อมูลบัญชีผู้ใช้</h2>
        <div className="mt-3">
          <input
            type="text"
            name="newUsername"
            placeholder="ชื่อผู้ใช้"
            value={newUsername}
            onChange={this.handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="newPassword"
            placeholder="รหัสผ่าน"
            value={newPassword}
            onChange={this.handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="newRole"
            placeholder="สิทธิ์ผู้ใช้"
            value={newRole}
            onChange={this.handleInputChange}
            className="form-control mb-2"
          />
          {isEditing ? (
            <button className="btn btn-success" onClick={this.handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={this.handleAdd}>
              Add
            </button>
          )}
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ width: "5%" }}>ID</th>
              <th scope="col">ชื่อผู้ใช้</th>
              <th scope="col">รหัสผ่าน</th>
              <th scope="col">สิทธิ์ผู้ใช้</th>
              <th scope="col" style={{ width: "10%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => this.handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    );
  }
}
