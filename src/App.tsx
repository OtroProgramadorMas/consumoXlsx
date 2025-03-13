import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import VehiculosTable from './components/VehiculosTable';
import AgregarModal from './components/AgregarModal';
import ImportarExcelModal from './components/ImportarExcelModal';
import { useVehiculos } from './VehiculoContext';

const App: React.FC = () => {
  const [openAgregarModal, setOpenAgregarModal] = useState(false);
  const [openImportarExcelModal, setOpenImportarExcelModal] = useState(false);
  const { loading, error } = useVehiculos();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: '#1a237e' }}>
        Lista de Vehículos
      </Typography>

      {error && (
        <Box sx={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: 2, 
          borderRadius: 1, 
          marginBottom: 2,
          textAlign: 'center' 
        }}>
          {error}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAgregarModal(true)}
          disabled={loading}
        >
          Agregar Vehículo
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenImportarExcelModal(true)}
          disabled={loading}
        >
          Importar Excel
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <VehiculosTable />
      )}

      <AgregarModal
        open={openAgregarModal}
        onClose={() => setOpenAgregarModal(false)}
      />

      <ImportarExcelModal
        open={openImportarExcelModal}
        onClose={() => setOpenImportarExcelModal(false)}
      />
    </Box>
  );
};

export default App;