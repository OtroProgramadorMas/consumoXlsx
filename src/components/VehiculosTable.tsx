import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useVehiculos } from '../VehiculoContext';
import { useAlert } from '../AlertContext';

const VehiculosTable: React.FC = () => {
    const { vehiculos, fetchVehiculos } = useVehiculos();
    const { showAlert } = useAlert();
    
    const handleRefresh = async () => {
        try {
            await fetchVehiculos();
            showAlert('Lista de vehículos actualizada', 'success');
        } catch (error) {
            showAlert('Error al actualizar la lista de vehículos', 'error');
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mr: '5%' }}>
                <Button 
                    variant="outlined" 
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                >
                    Actualizar
                </Button>
            </Box>
            
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    margin: 'auto',
                    maxWidth: '90%',
                    marginTop: 2,
                    marginBottom: 4
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3949ab' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Marca</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Modelo</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipo</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Año</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Combustible</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehiculos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                                    No hay vehículos disponibles
                                </TableCell>
                            </TableRow>
                        ) : (
                            vehiculos.map((vehiculo, index) => (
                                <TableRow
                                    key={vehiculo.id}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? 'background.paper' : 'action.hover'
                                    }}
                                >
                                    <TableCell>{vehiculo.id}</TableCell>
                                    <TableCell>{vehiculo.marca}</TableCell>
                                    <TableCell>{vehiculo.modelo}</TableCell>
                                    <TableCell>{vehiculo.tipo}</TableCell>
                                    <TableCell>{vehiculo.año}</TableCell>
                                    <TableCell>{vehiculo.combustible}</TableCell>
                                    <TableCell>{vehiculo.precio && `$${vehiculo.precio.toLocaleString()}`}</TableCell>
                                    <TableCell>{vehiculo.estado}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default VehiculosTable;