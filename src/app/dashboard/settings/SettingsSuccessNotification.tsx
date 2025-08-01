// src/app/dashboard/settings/SettingsSuccessNotification.tsx

'use client';

import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface SettingsSuccessNotificationProps {
  show: boolean;
  onClose: () => void;
}

const SettingsSuccessNotification: React.FC<SettingsSuccessNotificationProps> = ({ show, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>Your profile settings have been updated successfully!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SettingsSuccessNotification;