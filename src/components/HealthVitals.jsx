import { useState } from 'react';
import { format } from 'date-fns';              //subDays

function HealthVitals({ vitals, setVitals }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVital, setNewVital] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: '',
    bloodSugar: '',
    notes: ''
  });

  const handleAddVital = () => {
    if (newVital.bloodPressure || newVital.heartRate || newVital.temperature) {
      const vital = {
        id: Date.now(),
        ...newVital,
        timestamp: new Date().toISOString()
      };
      setVitals([vital, ...vitals]);
      setNewVital({
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'HH:mm'),
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        weight: '',
        bloodSugar: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  const getVitalStatus = (type, value) => {
    switch (type) {
      case 'bloodPressure':
        const [systolic, diastolic] = value.split('/').map(Number);
        if (systolic > 140 || diastolic > 90) return 'high';
        if (systolic < 90 || diastolic < 60) return 'low';
        return 'normal';
      case 'heartRate':
        const hr = parseInt(value);
        if (hr > 100) return 'high';
        if (hr < 60) return 'low';
        return 'normal';
      case 'temperature':
        const temp = parseFloat(value);
        if (temp > 37.5) return 'high';
        if (temp < 36.0) return 'low';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'high': return '🔴';
      case 'low': return '🔵';
      default: return '🟢';
    }
  };

  const recentVitals = vitals.slice(0, 7);

  return (
    <div className="health-vitals">
      <div className="section-header">
        <h2>❤️ Health Vitals</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Record Vitals
        </button>
      </div>

      <div className="vitals-summary">
        <div className="summary-cards">
          <div className="summary-card">
            <h3>🩸 Blood Pressure</h3>
            <p className="value">
              {vitals[0]?.bloodPressure || 'Not recorded'}
            </p>
            <p className="date">
              {vitals[0] ? format(new Date(vitals[0].timestamp), 'MMM dd, h:mm a') : ''}
            </p>
          </div>

          <div className="summary-card">
            <h3>💓 Heart Rate</h3>
            <p className="value">
              {vitals[0]?.heartRate ? `${vitals[0].heartRate} bpm` : 'Not recorded'}
            </p>
            <p className="date">
              {vitals[0] ? format(new Date(vitals[0].timestamp), 'MMM dd, h:mm a') : ''}
            </p>
          </div>

          <div className="summary-card">
            <h3>🌡️ Temperature</h3>
            <p className="value">
              {vitals[0]?.temperature ? `${vitals[0].temperature}°C` : 'Not recorded'}
            </p>
            <p className="date">
              {vitals[0] ? format(new Date(vitals[0].timestamp), 'MMM dd, h:mm a') : ''}
            </p>
          </div>

          <div className="summary-card">
            <h3>⚖️ Weight</h3>
            <p className="value">
              {vitals[0]?.weight ? `${vitals[0].weight} kg` : 'Not recorded'}
            </p>
            <p className="date">
              {vitals[0] ? format(new Date(vitals[0].timestamp), 'MMM dd, h:mm a') : ''}
            </p>
          </div>
        </div>
      </div>

      {recentVitals.length === 0 ? (
        <div className="empty-state">
          <h3>No health data recorded yet</h3>
          <p>Start tracking your health by recording your first measurements</p>
        </div>
      ) : (
        <div className="vitals-history">
          <h3>Recent Measurements</h3>
          <div className="vitals-list">
            {recentVitals.map(vital => (
              <div key={vital.id} className="vital-record">
                <div className="vital-header">
                  <span className="vital-date">
                    {format(new Date(vital.timestamp), 'MMM dd, yyyy - h:mm a')}
                  </span>
                </div>
                <div className="vital-measurements">
                  {vital.bloodPressure && (
                    <div className="measurement">
                      <span className="measurement-label">Blood Pressure:</span>
                      <span className="measurement-value">
                        {getStatusIcon(getVitalStatus('bloodPressure', vital.bloodPressure))}
                        {vital.bloodPressure} mmHg
                      </span>
                    </div>
                  )}
                  {vital.heartRate && (
                    <div className="measurement">
                      <span className="measurement-label">Heart Rate:</span>
                      <span className="measurement-value">
                        {getStatusIcon(getVitalStatus('heartRate', vital.heartRate))}
                        {vital.heartRate} bpm
                      </span>
                    </div>
                  )}
                  {vital.temperature && (
                    <div className="measurement">
                      <span className="measurement-label">Temperature:</span>
                      <span className="measurement-value">
                        {getStatusIcon(getVitalStatus('temperature', vital.temperature))}
                        {vital.temperature}°C
                      </span>
                    </div>
                  )}
                  {vital.weight && (
                    <div className="measurement">
                      <span className="measurement-label">Weight:</span>
                      <span className="measurement-value">
                        {vital.weight} kg
                      </span>
                    </div>
                  )}
                  {vital.bloodSugar && (
                    <div className="measurement">
                      <span className="measurement-label">Blood Sugar:</span>
                      <span className="measurement-value">
                        {vital.bloodSugar} mg/dL
                      </span>
                    </div>
                  )}
                  {vital.notes && (
                    <div className="vital-notes">
                      <strong>Notes:</strong> {vital.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Record Health Vitals</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            <div className="form">
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newVital.date}
                    onChange={(e) => setNewVital({...newVital, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newVital.time}
                    onChange={(e) => setNewVital({...newVital, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Blood Pressure (mmHg)</label>
                <input
                  type="text"
                  value={newVital.bloodPressure}
                  onChange={(e) => setNewVital({...newVital, bloodPressure: e.target.value})}
                  placeholder="e.g., 120/80"
                />
              </div>

              <div className="form-group">
                <label>Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={newVital.heartRate}
                  onChange={(e) => setNewVital({...newVital, heartRate: e.target.value})}
                  placeholder="e.g., 72"
                />
              </div>

              <div className="form-group">
                <label>Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newVital.temperature}
                  onChange={(e) => setNewVital({...newVital, temperature: e.target.value})}
                  placeholder="e.g., 37.0"
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={newVital.weight}
                  onChange={(e) => setNewVital({...newVital, weight: e.target.value})}
                  placeholder="e.g., 70"
                />
              </div>

              <div className="form-group">
                <label>Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  value={newVital.bloodSugar}
                  onChange={(e) => setNewVital({...newVital, bloodSugar: e.target.value})}
                  placeholder="e.g., 110"
                />
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea
                  value={newVital.notes}
                  onChange={(e) => setNewVital({...newVital, notes: e.target.value})}
                  placeholder="How are you feeling? Any symptoms?"
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleAddVital}>
                  Save Measurements
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthVitals;