import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import VehiculosTable from './components/VehiculosTable';
import AgregarModal from './components/AgregarModal';
import ImportarExcelModal from './components/ImportarExcelModal';

const App: React.FC = () => {
  const [openAgregarModal, setOpenAgregarModal] = useState(false);
  const [openImportarExcelModal, setOpenImportarExcelModal] = useState(false);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: '#1a237e' }}>
        Lista de Vehículos
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAgregarModal(true)}
        >
          Agregar Vehículo
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenImportarExcelModal(true)}
        >
          Importar Excel
        </Button>
      </Box>

      <VehiculosTable />

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