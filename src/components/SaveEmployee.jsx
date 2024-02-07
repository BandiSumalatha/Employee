import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../../src/components/savedEmp.css"

const cities = ['New York', 'London', 'Tokyo'];

const SavedEmp = () => {
  const navigate = useNavigate(); 

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    city: '',
    gender: '', // Change to a single gender field
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('customerData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    localStorage.setItem('customerData', JSON.stringify(formData));
    setEditMode(false);
    navigate('/'); 
  };

  return (
    <form className="form-container">
      <h1>Saved Employee Data</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          disabled={!editMode}
          required
        />
      </div>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          value={formData.employeeId}
          onChange={handleInputChange}
          name="employeeId"
          disabled={!editMode}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <select
          value={formData.city}
          onChange={handleInputChange}
          disabled={!editMode}
          required
          name="city"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="radio"
          checked={formData.gender === 'male'}
          onChange={handleInputChange}
          value="male"
          name="gender"
          disabled={!editMode}
        />
        <label>Male</label>
        <input
          type="radio"
          checked={formData.gender === 'female'}
          onChange={handleInputChange}
          value="female"
          name="gender"
          disabled={!editMode}
        />
        <label>Female</label>
      </div>
      <div className="button-container">
        {!editMode && <button className='editbutton'onClick={handleEdit}>Edit</button>}
       
        {editMode ? (
          <button className='savebutton' onClick={handleSave}>Save</button>
        ) : null}
      </div>
    </form>
  );
};

export default SavedEmp;
