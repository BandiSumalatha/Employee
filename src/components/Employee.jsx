import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
const cities = ['New York', 'London', 'Tokyo'];

function EmpForm() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    city: '',
    male: false,
    female: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    employeeId: '',
    city: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'male' || name === 'female' ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Please enter name';
    }
    if (!formData.employeeId) {
      newErrors.employeeId = 'Please enter employee ID';
    }
    if (!formData.city) {
      newErrors.city = 'Please select a city';
    }
    if (!formData.male && !formData.female) {
      newErrors.gender = 'Please select gender';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('customerData', JSON.stringify(formData));
      alert('Data saved successfully');
      setFormData({
        name: '',
        employeeId: '',
        city: '',
        male: false,
        female: false,
      });
      navigate("/save"); 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', margin: '20px auto', width:'100%', border: "1px solid black" }}>
      <div style={{ padding: '10px 30px 30px' }}>
        <h1 style={{ marginBottom: '10px' }}>Employee Form</h1>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ marginRight: '10px' }}>Name*:</label>
          
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '90%' }}
            placeholder="Enter Name"
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ marginRight: '10px' }}>Employee ID*:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '90%' }}
            placeholder="Enter Employee ID"
          />
          {errors.employeeId && <span style={{ color: 'red' }}>{errors.employeeId}</span>}
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ marginRight: '10px' }}>City*:</label>
          <select name="city" value={formData.city} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ marginRight: '10px' }}>Gender*:</label>
          <input
            type="checkbox"
            checked={formData.male}
            onChange={handleChange}
            name="male"
            style={{ marginRight: '5px' }}
          />
          <label style={{ marginRight: '15px' }}>Male</label>
          <input
            type="checkbox"
            checked={formData.female}
            onChange={handleChange}
            name="female"
            style={{ marginRight: '5px' }}
          />
          <label>Female</label>
          {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
        </div>
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', width: '100%', cursor: 'pointer' }}>Save</button>
      </div>
    </form>
  );
}

export default EmpForm;
