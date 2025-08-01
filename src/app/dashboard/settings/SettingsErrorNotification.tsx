// src/app/dashboard/settings/SettingsErrorNotification.tsx

import React from 'react';

interface SettingsErrorNotificationProps {
    errorMessage: string | null;
    onDismiss: () => void;
}

const SettingsErrorNotification: React.FC<SettingsErrorNotificationProps> = ({ errorMessage, onDismiss }) => {
    if (!errorMessage) return null;

    return (
        <div role="alert" aria-live="assertive" className="error-notification">
            <div className="error-message">
                {errorMessage}
            </div>
            <button onClick={onDismiss} className="dismiss-button">
                Dismiss
            </button>
        </div>
    );
};

export default SettingsErrorNotification;



/* Add this to your globals.css or a specific CSS file for the component */

.error-notification {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 16px;
    margin: 16px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dismiss-button {
    background: transparent;
    border: none;
    color: #721c24;
    cursor: pointer;
    font-weight: bold;
}