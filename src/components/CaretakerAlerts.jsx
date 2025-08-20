import { useState } from 'react';
import { format } from 'date-fns';

function CaretakerAlerts({ alerts, setAlerts, emergencyContacts }) {
  const [customAlert, setCustomAlert] = useState('');
  const [alertHistory, setAlertHistory] = useState(() => {
    const saved = localStorage.getItem('alertHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const sendAlert = (type, message) => {
    const alert = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    const newHistory = [alert, ...alertHistory];
    setAlertHistory(newHistory);
    localStorage.setItem('alertHistory', JSON.stringify(newHistory));
    
    // In a real app, this would send actual notifications
    alert(`Alert sent to caretakers: ${message}`);
  };

  const quickAlerts = [
    { type: 'help', message: 'I need help', icon: '🆘' },
    { type: 'fall', message: 'I have fallen and need assistance', icon: '⚠️' },
    { type: 'medicine', message: 'I forgot to take my medicine', icon: '💊' },
    { type: 'pain', message: 'I am experiencing pain', icon: '😰' },
    { type: 'confused', message: 'I am feeling confused or disoriented', icon: '😵' },
    { type: 'sick', message: 'I am not feeling well', icon: '🤒' }
  ];

  const handleCustomAlert = () => {
    if (customAlert.trim()) {
      sendAlert('custom', customAlert);
      setCustomAlert('');
    }
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="caretaker-alerts">
      <div className="section-header">
        <h2>🔔 Caretaker Alerts</h2>
      </div>

      <div className="emergency-section">
        <h3>🚨 Emergency Alerts</h3>
        <p className="emergency-note">
          Use these buttons to quickly alert your caretakers in case of emergency
        </p>
        <div className="quick-alerts">
          {quickAlerts.map(alert => (
            <button
              key={alert.type}
              className="quick-alert-button"
              onClick={() => sendAlert(alert.type, alert.message)}
            >
              <span className="alert-icon">{alert.icon}</span>
              <span className="alert-text">{alert.message}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="custom-alert-section">
        <h3>📝 Custom Message</h3>
        <div className="custom-alert-form">
          <textarea
            value={customAlert}
            onChange={(e) => setCustomAlert(e.target.value)}
            placeholder="Type your custom message to caretakers..."
            rows="4"
            className="custom-alert-input"
          />
          <button 
            className="send-alert-button"
            onClick={handleCustomAlert}
            disabled={!customAlert.trim()}
          >
            📤 Send Alert
          </button>
        </div>
      </div>

      <div className="active-alerts">
        <h3>⚡ Active Alerts</h3>
        {alerts.length === 0 ? (
          <p className="no-alerts">No active alerts</p>
        ) : (
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                <div className="alert-content">
                  <span className="alert-message">{alert.message}</span>
                  <span className="alert-time">
                    {format(new Date(), 'h:mm a')}
                  </span>
                </div>
                <button 
                  className="dismiss-button"
                  onClick={() => dismissAlert(alert.id)}
                >
                  ✓ Dismiss
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="alert-history">
        <h3>📜 Alert History</h3>
        {alertHistory.length === 0 ? (
          <p className="no-history">No alerts sent yet</p>
        ) : (
          <div className="history-list">
            {alertHistory.slice(0, 10).map(alert => (
              <div key={alert.id} className="history-item">
                <div className="history-content">
                  <span className="history-message">{alert.message}</span>
                  <div className="history-meta">
                    <span className="history-date">
                      {format(new Date(alert.timestamp), 'MMM dd, yyyy - h:mm a')}
                    </span>
                    <span className={`history-status ${alert.status}`}>
                      {alert.status === 'sent' ? '✅ Sent' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="caretaker-info">
        <h3>👥 Your Caretakers</h3>
        <div className="caretakers-list">
          {emergencyContacts.slice(0, 3).map(contact => (
            <div key={contact.id} className="caretaker-item">
              <div className="caretaker-info">
                <span className="caretaker-name">{contact.name}</span>
                <span className="caretaker-relationship">{contact.relationship}</span>
              </div>
              <span className="caretaker-phone">{contact.phone}</span>
            </div>
          ))}
        </div>
        <p className="alert-note">
          Alerts will be sent to all your emergency contacts via phone, text, and email.
        </p>
      </div>
    </div>
  );
}

export default CaretakerAlerts;