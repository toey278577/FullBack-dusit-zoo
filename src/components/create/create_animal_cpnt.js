import React, { Component } from 'react';

class CreateAnimal extends Component {
  state = {
    animalName: '',
    animalType: '',
    animalImage: null, // Stores the file object
    behavior: '',
    habitat: '',
    breedingConservation: '',
    imagePreview: '', // URL for image preview
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ 
        animalImage: file,
        imagePreview: URL.createObjectURL(file) // Create a URL for image preview
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { animalImage, ...rest } = this.state;

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append('file', animalImage);
    formData.append('animalName', rest.animalName);
    formData.append('animalType', rest.animalType);
    formData.append('behavior', rest.behavior);
    formData.append('habitat', rest.habitat);
    formData.append('breedingConservation', rest.breedingConservation);

    // Example of how to upload image
    fetch('/api/animals', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle success
      // Reset form or redirect as needed
    })
    .catch(error => console.error('Error:', error));
  };

  render() {
    const {
      animalName,
      animalType,
      behavior,
      habitat,
      breedingConservation,
      imagePreview
    } = this.state;

    return (
      <div className="container mt-3">
        <h2>เพิ่มข้อมูลสัตว์</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="animalName" className="form-label">ชื่อสัตว์</label>
            <input
              type="text"
              className="form-control"
              id="animalName"
              name="animalName"
              value={animalName}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleFileChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-primary">บันทึก</button>
        </form>
      </div>
    );
  }
}

export default CreateAnimal;
    