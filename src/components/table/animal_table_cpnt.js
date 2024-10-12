import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Img1 from '../../imges/animals/68943.jpg';
import Img2 from '../../imges/animals/68956.jpg';
import Img3 from '../../imges/animals/68949.jpg';

function AnimalTable() {
  const [data, setData] = useState([
    { id: 1, animalName: 'animalName1', animalImage: Img1 },
    { id: 2, animalName: 'animalName 2', animalImage: Img2 },
    { id: 3, animalName: 'animalName 3', animalImage: Img3 },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือว่าต้องการลบข้อมูลสัตว์นี้?");
    if (confirmDelete) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/animals/${id}`);
  };

  const handleEdit = (item) => {
    navigate(`/animals/${item.id}`);
  };

  const handleAddAnimal = () => {
    navigate('/animals/create');
  };
  
  return (
    <div className="container mt-3 columz">
      <br />
      <br />
      <br />
      <h2>ตารางข้อมูลสัตว์</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={handleAddAnimal}
      >
        เพิ่มข้อมูลสัตว์
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{ width: '5%' }}>ID</th>
            <th scope="col">ชื่อสัตว์</th>
            <th scope="col">รูปภาพ</th>
            <th scope="col" style={{ width: '10%' }}>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
              <td>{item.id}</td>
              <td>{item.animalName}</td>
              <td>
                <img
                  src={item.animalImage}
                  alt={item.animalName}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item);
                  }}
                >
                  แก้ไข
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
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

export default AnimalTable;
