import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './animal_table_cpnt.css'; // อย่าลืมปรับชื่อไฟล์ CSS ให้ตรงกับชื่อไฟล์ของคุณ
import './animal_type_table_cpnt.css'
import data from '../../mock_api/animalType.json'

export default class AnimalTypeTable extends Component {
  state = {
    data: data,
    newType: '',
    isEditing: false,
    currentItem: null,
  };

  // ฟังก์ชันเพิ่มข้อมูลใหม่
  handleAdd = () => {
    const { data, newType } = this.state;
    if (newType) {
      const newItem = {
        id: data.length + 1,
        type: newType,
        action: '', // ไม่ต้องใช้ action อีกต่อไป
      };
      this.setState({
        data: [...data, newItem],
        newType: '',
      });
    }
  };

  // ฟังก์ชันแก้ไขข้อมูล
  handleEdit = (item) => {
    this.setState({
      isEditing: true,
      currentItem: item,
      newType: item.type,
    });
  };

  // ฟังก์ชันบันทึกข้อมูลที่แก้ไข
  handleSave = () => {
    const { data, currentItem, newType } = this.state;
    const updatedData = data.map((item) =>
      item.id === currentItem.id ? { ...item, type: newType } : item
    );
    this.setState({
      data: updatedData,
      isEditing: false,
      currentItem: null,
      newType: '',
    });
  };

  // ฟังก์ชันลบข้อมูล
  handleDelete = (id) => {
    const updatedData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: updatedData });
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงอินพุต
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { data, newType, isEditing } = this.state;

    return (
      <div className="container mt-3 columz">
        <br/>
        <br/>
        <br/>
        <h2>ตารางประเภทสัตว์</h2>
        <div className="mt-3">
          <input
            type="text"
            name="newType"
            placeholder="Type"
            value={newType}
            onChange={this.handleInputChange}
            className="form-control mb-2"
          />
          {isEditing ? (
            <button className="btn btn-success" onClick={this.handleSave}>
              บันทึก
            </button>
          ) : (
            <button className="btn btn-primary" onClick={this.handleAdd}>
              เพิ่ม
            </button>
          )}
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ width: '5%' }}>ลำดับ</th>
              <th scope="col">ข้อมูลสัตว์</th>
              <th scope="col" style={{ width: '10%' }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => this.handleEdit(item)}>
                    เเก้ไข
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(item.id)}>
                    ลบ
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