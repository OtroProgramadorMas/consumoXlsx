import React, { useState } from 'react';
import { Modal, Box, Typography, Button, CircularProgress, LinearProgress } from '@mui/material';
import { useVehiculos } from '../VehiculoContext';
import { useAlert } from '../AlertContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImportarExcelModalProps {
  open: boolean;
  onClose: () => void;
}

const ImportarExcelModal: React.FC<ImportarExcelModalProps> = ({ open, onClose }) => {
  const { importVehiculos, loading } = useVehiculos();
  const { showAlert } = useAlert();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      showAlert('Por favor, seleccione un archivo', 'warning');
      return;
    }

    try {
      const success = await importVehiculos(file);
      
      if (success) {
        onClose();
        setFile(null);
        setFileName('');
        showAlert('Datos importados exitosamente', 'success');
      }
    } catch (error) {
      showAlert('Error al importar datos', 'error');
    }
  };

  const handleClose = () => {
    setFile(null);
    setFileName('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Importar Excel
        </Typography>
        
        <Box sx={{ 
          border: '2px dashed #ccc', 
          borderRadius: 2, 
          p: 3, 
          textAlign: 'center',
          mb: 3,
          '&:hover': {
            borderColor: 'primary.main',
            cursor: 'pointer'
          }
        }} onClick={() => document.getElementById('file-input')?.click()}>
          <input
            id="file-input"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <CloudUploadIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
          <Typography>
            {fileName || 'Haga clic para seleccionar un archivo Excel (.xlsx, .xls)'}
          </Typography>
        </Box>
        
        {loading && (
          <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
            <LinearProgress />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleClose} 
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!file || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Importar'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImportarExcelModal;