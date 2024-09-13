import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js';

export const ContactsForm = () => {
  const { actions } = useContext(Context);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.createContact(newContact);

      const localContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      localContacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(localContacts));

      navigate('/contacts');
    } catch (error) {
      console.error('Error saving the contact', error);
    }
  };

  const handleCancel = () => {
    navigate('/contacts');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form text-dark">
        <div className="form-group">
          <label htmlFor="name">Full Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            value={newContact.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={newContact.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Phone*</label>
          <input
            type="tel"
            id="telefono"
            name="phone"
            placeholder="Enter phone number"
            value={newContact.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Address*</label>
          <input
            type="text"
            id="direccion"
            name="address"
            placeholder="Enter address"
            value={newContact.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Contact</button>
        <button type="button" onClick={handleCancel} className="btn btn-secondary ms-2">Cancel</button>
      </form>
    </div>
  );
};