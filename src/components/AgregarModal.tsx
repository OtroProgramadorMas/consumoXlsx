import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface AgregarModalProps {
    open: boolean;
    onClose: () => void;
}

const AgregarModal: React.FC<AgregarModalProps> = ({ open, onClose }) => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [tipo, setTipo] = useState('');
    const [año, setAño] = useState<number | ''>('');
    const [combustible, setCombustible] = useState('');
    const [precio, setPrecio] = useState<number | ''>('');
    const [estado, setEstado] = useState('');

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const nuevoVehiculo = {
            marca,
            modelo,
            tipo,
            año: año === '' ? null : año,
            combustible: combustible === '' ? null : combustible,
            precio: precio === '' ? null : precio,
            estado: estado === '' ? null : estado,
        };

        try {
            const response = await fetch('http://localhost:8000/vehiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoVehiculo),
            });

            const data = await response.json();

            if (data.success) {
                onClose(); // Cerrar el modal después de un envío exitoso
            }
        } catch (error) {
            console.error("Error al agregar vehículo:", error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Agregar Vehículo
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Marca"
                        variant="outlined"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Modelo"
                        variant="outlined"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Tipo"
                        variant="outlined"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Año"
                        variant="outlined"
                        type="number"
                        value={año}
                        onChange={(e) => setAño(e.target.value === '' ? '' : Number(e.target.value))}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Combustible"
                        variant="outlined"
                        value={combustible}
                        onChange={(e) => setCombustible(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Precio"
                        variant="outlined"
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value === '' ? '' : Number(e.target.value))}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Estado"
                        variant="outlined"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            Agregar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AgregarModal;