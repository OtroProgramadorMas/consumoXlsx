import React, { useState } from 'react';
import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';

interface ImportarExcelModalProps {
  open: boolean;
  onClose: () => void;
}

const ImportarExcelModal: React.FC<ImportarExcelModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onClose(); // Cerrar el modal después de un envío exitoso
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Importar Excel
        </Typography>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          style={{ marginBottom: 20 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
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