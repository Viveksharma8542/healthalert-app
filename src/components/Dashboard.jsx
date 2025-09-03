import { format, isToday } from 'date-fns';

function Dashboard({ medicines, vitals, alerts, setActiveTab }) {
  const todaysMedicines = medicines.filter(medicine => 
    medicine.schedule.some(time => {
      const scheduleTime = new Date();
      const [hours, minutes] = time.split(':');
      scheduleTime.setHours(parseInt(hours), parseInt(minutes));
      return isToday(scheduleTime);
    })
  );

  const todaysVitals = vitals.filter(vital => 
    isToday(new Date(vital.date))
  );

  const upcomingMedicines = medicines.slice(0, 3).map(medicine => {
    const nextTime = medicine.schedule[0];
    return {
      name: medicine.name,
      time: nextTime,
      dosage: medicine.dosage
    };
  });

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Good {getTimeOfDay()}!👋</h2>
        <p className="date-display">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card emergency-card">
          <h3>🚨 Emergency</h3>
          <p>Quick access to emergency contacts</p>
          <button 
            className="emergency-button"
            onClick={() => setActiveTab('emergency')}
          >
            Call Emergency Contact
          </button>
        </div>

        <div className="dashboard-card medicine-card">
          <h3>💊 Today's Medicines</h3>
          {todaysMedicines.length > 0 ? (
            <div className="medicine-list">
              {upcomingMedicines.map((medicine, index) => (
                <div key={index} className="medicine-item">
                  <span className="medicine-name">{medicine.name}</span>
                  <span className="medicine-time">{medicine.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No medicines scheduled for today</p>
          )}
          <button 
            className="dashboard-button"
            onClick={() => setActiveTab('medicine')}
          >
            View All Medicines
          </button>
        </div>

        <div className="dashboard-card vitals-card">
          <h3>❤️ Health Check</h3>
          {todaysVitals.length > 0 ? (
            <div className="vitals-summary">
              <p>Blood Pressure: {todaysVitals[0]?.bloodPressure || 'Not recorded'}</p>
              <p>Heart Rate: {todaysVitals[0]?.heartRate || 'Not recorded'} bpm</p>
            </div>
          ) : (
            <p>No health data recorded today</p>
          )}
          <button 
            className="dashboard-button"
            onClick={() => setActiveTab('vitals')}
          >
            Record Vitals
          </button>
        </div>

        <div className="dashboard-card alerts-card">
          <h3>🔔 Alerts & Reminders</h3>
          {alerts.length > 0 ? (
            <div className="alerts-summary">
              <p className="alert-count">{alerts.length} active alert{alerts.length > 1 ? 's' : ''}</p>
              {alerts.slice(0, 2).map((alert, index) => (
                <p key={index} className="alert-preview">{alert.message}</p>
              ))}
            </div>
          ) : (
            <p>No active alerts</p>
          )}
          <button 
            className="dashboard-button"
            onClick={() => setActiveTab('caretaker')}
          >
            View All Alerts
          </button>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-button" onClick={() => setActiveTab('medicine')}>
            📝 Add Medicine
          </button>
          <button className="action-button" onClick={() => setActiveTab('vitals')}>
            📊 Record Health
          </button>
          <button className="action-button" onClick={() => setActiveTab('emergency')}>
            📞 Emergency Call
          </button>
        </div>
      </div>
    </div>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

export default Dashboard;


