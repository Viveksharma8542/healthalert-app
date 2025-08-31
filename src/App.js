import { useState, useEffect } from 'react';
import { format, isToday } from 'date-fns';                    //isPast, addMinutes
import MedicineReminders from './components/MedicineReminders';
import CaretakerAlerts from './components/CaretakerAlerts';
import HealthVitals from './components/HealthVitals';
import EmergencyContacts from './components/EmergencyContacts';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem('medicines');
    return saved ? JSON.parse(saved) : [];
  });
  const [vitals, setVitals] = useState(() => {
    const saved = localStorage.getItem('vitals');
    return saved ? JSON.parse(saved) : [];
  });
  const [emergencyContacts, setEmergencyContacts] = useState(() => {
    const saved = localStorage.getItem('emergencyContacts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Dr. Smith', phone: '555-0123', relationship: 'Primary Doctor' },
      { id: 2, name: 'Family Member', phone: '555-0456', relationship: 'Son/Daughter' }
    ];
  });
  const [alerts, setAlerts] = useState([]);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('vitals', JSON.stringify(vitals));
  }, [vitals]);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  // Check for medicine reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const newAlerts = [];

      medicines.forEach(medicine => {
        medicine.schedule.forEach(time => {
          const reminderTime = new Date();
          const [hours, minutes] = time.split(':');
          reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

          if (isToday(reminderTime) && Math.abs(now - reminderTime) <= 5 * 60 * 1000) {
            newAlerts.push({
              id: `${medicine.id}-${time}`,
              type: 'medicine',
              message: `Time to take ${medicine.name} - ${medicine.dosage}`,
              time: format(reminderTime, 'HH:mm'),
              medicine: medicine.name
            });
          }
        });
      });

      setAlerts(newAlerts);
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [medicines]);

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'medicine', label: 'Medicine', icon: '💊' },
    { id: 'vitals', label: 'Health', icon: '❤️' },
    { id: 'caretaker', label: 'Alerts', icon: '🔔' },
    { id: 'emergency', label: 'Emergency', icon: '🚨' }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Senior Care Assistant</h1>
        <div className="current-time">
          {format(new Date(), 'EEEE, MMMM do, yyyy - h:mm a')}
        </div>
      </header>
      <nav className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            medicines={medicines}
            vitals={vitals}
            alerts={alerts}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'medicine' && (
          <MedicineReminders
            medicines={medicines}
            setMedicines={setMedicines}
          />
        )}
        {activeTab === 'vitals' && (
          <HealthVitals
            vitals={vitals}
            setVitals={setVitals}
          />
        )}
        {activeTab === 'caretaker' && (
          <CaretakerAlerts
            alerts={alerts}
            setAlerts={setAlerts}
            emergencyContacts={emergencyContacts}
          />
        )}
        {activeTab === 'emergency' && (
          <EmergencyContacts
            contacts={emergencyContacts}
            setContacts={setEmergencyContacts}
          />
        )}
      </main>

      {alerts.length > 0 && (
        <div className="alert-overlay">
          <div className="alert-modal">
            <h2>⏰ Medicine Reminder</h2>
            {alerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <p className="alert-message">{alert.message}</p>
                <p className="alert-time">Scheduled for {alert.time}</p>
              </div>
            ))}
            <div className="alert-actions">
              <button
                className="alert-button taken"
                onClick={() => setAlerts([])}
              >
                ✅ Taken
              </button>
              <button
                className="alert-button snooze"
                onClick={() => {
                  // Snooze for 10 minutes
                  setTimeout(() => setAlerts([]), 10 * 60 * 1000);
                  setAlerts([]);
                }}
              >
                ⏰ Snooze 10min
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;