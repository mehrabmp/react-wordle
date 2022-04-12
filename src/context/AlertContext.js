import { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (alertMessage, alertStatus, persist) => {
    setMessage(alertMessage);
    setStatus(alertStatus);
    setIsVisible(true);

    if (!persist) setTimeout(() => setIsVisible(false), 2000);
  };

  return (
    <AlertContext.Provider value={{ message, status, isVisible, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
