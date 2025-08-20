import { useState } from 'react';
import { format } from 'date-fns';

function MedicineReminders({ medicines, setMedicines }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    times: ['08:00'],
    notes: '',
    startDate: format(new Date(), 'yyyy-MM-dd')
  });

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dosage) {
      const medicine = {
        id: Date.now(),
        ...newMedicine,
        schedule: newMedicine.times,
        createdAt: new Date().toISOString()
      };
      setMedicines([...medicines, medicine]);
      setNewMedicine({
        name: '',
        dosage: '',
        frequency: 'daily',
        times: ['08:00'],
        notes: '',
        startDate: format(new Date(), 'yyyy-MM-dd')
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteMedicine = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const addTimeSlot = () => {
    setNewMedicine({
      ...newMedicine,
      times: [...newMedicine.times, '09:00']
    });
  };

  const updateTimeSlot = (index, time) => {
    const updatedTimes = [...newMedicine.times];
    updatedTimes[index] = time;
    setNewMedicine({
      ...newMedicine,
      times: updatedTimes
    });
  };

  const removeTimeSlot = (index) => {
    if (newMedicine.times.length > 1) {
      const updatedTimes = newMedicine.times.filter((_, i) => i !== index);
      setNewMedicine({
        ...newMedicine,
        times: updatedTimes
      });
    }
  };

  return (
    <div className="medicine-reminders">
      <div className="section-header">
        <h2>💊 Medicine Reminders</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Medicine
        </button>
      </div>

      {medicines.length === 0 ? (
        <div className="empty-state">
          <h3>No medicines added yet</h3>
          <p>Add your first medicine to get started with reminders</p>
        </div>
      ) : (
        <div className="medicine-list">
          {medicines.map(medicine => (
            <div key={medicine.id} className="medicine-card">
              <div className="medicine-header">
                <h3>{medicine.name}</h3>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteMedicine(medicine.id)}
                >
                  🗑️
                </button>
              </div>
              <div className="medicine-details">
                <p><strong>Dosage:</strong> {medicine.dosage}</p>
                <p><strong>Frequency:</strong> {medicine.frequency}</p>
                <p><strong>Times:</strong> {medicine.schedule.join(', ')}</p>
                {medicine.notes && <p><strong>Notes:</strong> {medicine.notes}</p>}
              </div>
              <div className="medicine-schedule">
                <h4>Today's Schedule:</h4>
                <div className="schedule-times">
                  {medicine.schedule.map((time, index) => (
                    <div key={index} className="schedule-time">
                      <span className="time">{time}</span>
                      <span className="dosage-info">{medicine.dosage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Medicine</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            <div className="form">
              <div className="form-group">
                <label>Medicine Name</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  placeholder="e.g., Aspirin, Metformin"
                />
              </div>

              <div className="form-group">
                <label>Dosage</label>
                <input
                  type="text"
                  value={newMedicine.dosage}
                  onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                  placeholder="e.g., 1 tablet, 5mg"
                />
              </div>

              <div className="form-group">
                <label>Frequency</label>
                <select
                  value={newMedicine.frequency}
                  onChange={(e) => setNewMedicine({...newMedicine, frequency: e.target.value})}
                >
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="three-times">Three Times Daily</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reminder Times</label>
                <div className="time-slots">
                  {newMedicine.times.map((time, index) => (
                    <div key={index} className="time-slot">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateTimeSlot(index, e.target.value)}
                      />
                      {newMedicine.times.length > 1 && (
                        <button
                          className="remove-time"
                          onClick={() => removeTimeSlot(index)}
                        >
                          ➖
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="add-time-button" onClick={addTimeSlot}>
                  ➕ Add Time
                </button>
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea
                  value={newMedicine.notes}
                  onChange={(e) => setNewMedicine({...newMedicine, notes: e.target.value})}
                  placeholder="Take with food, special instructions..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleAddMedicine}>
                  Save Medicine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicineReminders;