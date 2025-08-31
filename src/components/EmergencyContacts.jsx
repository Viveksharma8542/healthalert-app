import { useState } from 'react';

function EmergencyContacts({ contacts, setContacts }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
    email: ''
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now(),
        ...newContact,
        createdAt: new Date().toISOString()
      };
      setContacts([...contacts, contact]);
      setNewContact({
        name: '',
        phone: '',
        relationship: '',
        email: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const relationships = [
    'Primary Doctor',
    'Specialist Doctor',
    'Nurse',
    'Family Member',
    'Son/Daughter',
    'Spouse',
    'Caregiver',
    'Friend',
    'Neighbor',
    'Emergency Services'
  ];

  return (
    <div className="emergency-contacts">
      <div className="section-header">
        <h2>🚨 Emergency Contacts</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Contact
        </button>
      </div>

      <div className="emergency-banner">
        <h3>🚨 In Case of Emergency</h3>
        <div className="emergency-actions">
          <button className="emergency-call-button" onClick={() => handleCall('112')}>
            📞 Call 112
          </button>
          <p>For life-threatening emergencies, call 112 immediately</p>
        </div>
      </div>

      <div className="contacts-list">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-header">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p className="relationship">{contact.relationship}</p>
              </div>
              <button 
                className="delete-button"
                onClick={() => handleDeleteContact(contact.id)}
              >
                🗑️
              </button>
            </div>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <span className="contact-value">{contact.phone}</span>
                <button 
                  className="call-button"
                  onClick={() => handleCall(contact.phone)}
                >
                  📞 Call
                </button>
              </div>
              
              {contact.email && (
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">{contact.email}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="empty-state">
          <h3>No emergency contacts added</h3>
          <p>Add emergency contacts so they can be reached quickly when needed</p>
        </div>
      )}

      <div className="emergency-tips">
        <h3>💡 Emergency Tips</h3>
        <ul>
          <li>Keep your phone charged and within reach</li>
          <li>Have a backup way to contact help (landline, medical alert device)</li>
          <li>Keep important medical information easily accessible</li>
          <li>Consider wearing a medical alert bracelet or necklace</li>
          <li>Let neighbors know about your medical conditions if comfortable</li>
          <li>Know the location of nearest government hospital or primary health center</li>
          <li>Keep emergency numbers saved: Police (100), Fire (101), Ambulance (108), National Emergency (112)</li>
          <li>Have your Aadhaar card and insurance documents easily accessible</li>
        </ul>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Emergency Contact</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            <div className="form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Dr. Smith, John Doe"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="+91-98765-43210"
                />
              </div>

              <div className="form-group">
                <label>Relationship</label>
                <select
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                >
                  <option value="">Select relationship</option>
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Email (Optional)</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  placeholder="contact@example.com"
                />
              </div>

              <div className="form-actions">
                <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleAddContact}>
                  Save Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmergencyContacts;