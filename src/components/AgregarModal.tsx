import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useVehiculos } from '../VehiculoContext';
import { useAlert } from '../AlertContext';

interface AgregarModalProps {
    open: boolean;
    onClose: () => void;
}

const AgregarModal: React.FC<AgregarModalProps> = ({ open, onClose }) => {
    const { addVehiculo, loading } = useVehiculos();
    const { showAlert } = useAlert();

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

    const resetForm = () => {
        setMarca('');
        setModelo('');
        setTipo('');
        setAño('');
        setCombustible('');
        setPrecio('');
        setEstado('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!marca || !modelo || !tipo) {
            showAlert('Por favor, complete al menos los campos Marca, Modelo y Tipo.', 'warning');
            return;
        }

        const nuevoVehiculo = {
            marca,
            modelo,
            tipo,
            año: año === '' ? undefined : año,
            combustible: combustible === '' ? undefined : combustible,
            precio: precio === '' ? undefined : precio,
            estado: estado === '' ? undefined : estado,
        };

        try {
            const success = await addVehiculo(nuevoVehiculo);
            
            if (success) {
                resetForm();
                onClose();
                showAlert('Vehículo agregado exitosamente', 'success');
            }
        } catch (error) {
            showAlert('Error al agregar vehículo', 'error');
        }
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal open={open} onClose={handleCancel}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Agregar Vehículo
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Marca *"
                        variant="outlined"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Modelo *"
                        variant="outlined"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Tipo *"
                        variant="outlined"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
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
                        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button 
                            variant="contained" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Agregar'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AgregarModal;