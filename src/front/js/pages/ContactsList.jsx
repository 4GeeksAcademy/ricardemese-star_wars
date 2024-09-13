import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../component/Spinner.jsx';

export const ContactsList = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [newContactInfo, setNewContactInfo] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await actions.getContact();
        setLoading(false);
        setHasFetched(true);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Error fetching contacts. Try again later.');
        setLoading(false);
      }
    };

    if (!hasFetched) {
      fetchContacts();
    }
  }, [actions, hasFetched]);

  useEffect(() => {
    if (editContact) {
      console.log('Editing contact:', editContact);
    }
  }, [editContact]);

  const handleEdit = (contact) => {
    if (contact && contact.id) {
      setEditContact(contact);
      setNewContactInfo({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      });
    } else {
      console.error('Selected contact does not have an ID');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editContact || !editContact.id) {
      console.error('Edit contact ID is missing');
      return;
    }

    console.log('Saving edit for contact:', editContact.id);
    console.log('New contact info:', newContactInfo);

    try {
      await actions.updateContact(editContact.id, newContactInfo);
      setEditContact(null);
      console.log('Contact updated:', newContactInfo);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async (contact) => {
    if (!contact || !contact.id) {
      console.error('Contact does not have a valid ID');
      return;
    }
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await actions.deleteContact(contact);
        await actions.getContact();
        console.log('Contact deleted:', contact);
      } catch (error) {
        console.error('Error deleting contact:', error);
        setError('Error deleting contact. Try again later.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContactInfo(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Contacts</h2>
        <button className="btn btn-primary" onClick={() => navigate('/addcontacts')}>
          Add New Contact
        </button>
      </div>

      {store.contacts.length ? (
        <div className="d-flex flex-wrap justify-content-center text-dark">
          {store.contacts.map((contact) => (
            <div key={contact.id} className="card mb-3" style={{ maxWidth: '800px', width: '100%' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${Math.floor(Math.random() * 83) + 1}.jpg`}
                    className="img-fluid rounded-start"
                    alt={contact.name}
                    onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {editContact && editContact.id === contact.id ? (
                      <form onSubmit={handleSaveEdit}>
                        {['name', 'email', 'phone', 'address'].map(item => (
                          <input
                            key={item}
                            type={item === 'email' ? 'email' : 'text'}
                            name={item}
                            value={newContactInfo[item] || ''}
                            onChange={handleInputChange}
                            required
                            className="form-control mb-2"
                          />
                        ))}
                        <button type="submit" className="btn btn-success me-2">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditContact(null)}>
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text">
                          <i className="fas fa-envelope me-2"></i>{contact.email}
                        </p>
                        <p className="card-text">
                          <i className="fas fa-phone me-2"></i>{contact.phone}
                        </p>
                        <p className="card-text">
                          <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
                        </p>
                        <div className="d-flex">
                          <button className="btn btn-warning me-2" onClick={() => handleEdit(contact)}>
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDelete(contact)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No contacts added.</p>
      )}
    </div>
  );
};