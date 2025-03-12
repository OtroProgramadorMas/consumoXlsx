import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    tipo: string;
    año?: number;
    combustible?: string;
    precio?: number;
    estado?: string;
}

const VehiculosTable: React.FC = () => {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

    const fetchVehiculos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/vehiculos');
            setVehiculos(response.data.data);
        } catch (error) {
            console.error('Error fetching vehiculos:', error);
        }
    };

    useEffect(() => {
        fetchVehiculos();
    }, []);

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                boxShadow: 3,
                margin: 'auto',
                maxWidth: '90%',
                marginTop: 4
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
                    {vehiculos.map((vehiculo, index) => (
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
                            <TableCell>{vehiculo.precio}</TableCell>
                            <TableCell>{vehiculo.estado}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehiculosTable;