import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface AlertContextType {
  showAlert: (message: string, severity: AlertColor) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showAlert = (message: string, severity: AlertColor) => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default AlertContext;