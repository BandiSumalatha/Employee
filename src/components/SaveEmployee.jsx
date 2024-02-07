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
    male: false,
    female: false,
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('customerData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'male' || name === 'female' ? checked : value,
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
          type="checkbox"
          checked={formData.male}
          onChange={handleInputChange}
          name="male"
          disabled={!editMode}
        />
        <label>Male</label>
        <input
          type="checkbox"
          checked={formData.female}
          onChange={handleInputChange}
          name="female"
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
