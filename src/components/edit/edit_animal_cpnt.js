import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน withRouter

const EditAnimal = () => {
  const [animalName, setAnimalName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalImage, setAnimalImage] = useState(null);
  const [behavior, setBehavior] = useState('');
  const [habitat, setHabitat] = useState('');
  const [breedingConservation, setBreedingConservation] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'animalName') setAnimalName(value);
    else if (name === 'animalType') setAnimalType(value);
    else if (name === 'behavior') setBehavior(value);
    else if (name === 'habitat') setHabitat(value);
    else if (name === 'breedingConservation') setBreedingConservation(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnimalImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for image preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append('file', animalImage);
    formData.append('animalName', animalName);
    formData.append('animalType', animalType);
    formData.append('behavior', behavior);
    formData.append('habitat', habitat);
    formData.append('breedingConservation', breedingConservation);

    // Example of how to upload image
    fetch('/api/animals', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle success
        // Reset form or redirect as needed
      })
      .catch((error) => console.error('Error:', error));
  };

  // ฟังก์ชันสำหรับปุ่ม Cancel
  const handleCancel = () => {
    navigate('/animals'); // นำผู้ใช้กลับไปยังหน้า animals หรือหน้าที่ต้องการ
  };

  return (
    <div className="container mt-3">
      <h2>แก้ไขข้อมูลสัตว์</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="animalName" className="form-label">ชื่อสัตว์</label>
          <input
            type="text"
            className="form-control"
            id="animalName"
            name="animalName"
            value={animalName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="animalType" className="form-label">ประเภทสัตว์</label>
          <input
            type="text"
            className="form-control"
            id="animalType"
            name="animalType"
            value={animalType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="animalImage" className="form-label">อัปโหลดรูปภาพสัตว์</label>
          <input
            type="file"
            className="form-control"
            id="animalImage"
            name="animalImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image preview"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="behavior" className="form-label">พฤติกรรม</label>
          <textarea
            className="form-control"
            id="behavior"
            name="behavior"
            value={behavior}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="habitat" className="form-label">ที่อยู่อาศัย</label>
          <textarea
            className="form-control"
            id="habitat"
            name="habitat"
            value={habitat}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="breedingConservation" className="form-label">การเพาะพันธุ์และการอนุรักษ์</label>
          <textarea
            className="form-control"
            id="breedingConservation"
            name="breedingConservation"
            value={breedingConservation}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">บันทึก</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>ยกเลิก</button>
      </form>
    </div>
  );
};

export default EditAnimal;
