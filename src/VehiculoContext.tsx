import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  tipo: string;
  año?: number;
  combustible?: string;
  precio?: number;
  estado?: string;
}

interface VehiculoContextType {
  vehiculos: Vehiculo[];
  loading: boolean;
  error: string | null;
  fetchVehiculos: () => Promise<void>;
  addVehiculo: (vehiculo: Omit<Vehiculo, 'id'>) => Promise<boolean>;
  importVehiculos: (file: File) => Promise<boolean>;
}

const VehiculoContext = createContext<VehiculoContextType | undefined>(undefined);

export const useVehiculos = (): VehiculoContextType => {
  const context = useContext(VehiculoContext);
  if (!context) {
    throw new Error('useVehiculos debe ser usado dentro de un VehiculoProvider');
  }
  return context;
};

interface VehiculoProviderProps {
  children: ReactNode;
}

export const VehiculoProvider: React.FC<VehiculoProviderProps> = ({ children }) => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehiculos = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/vehiculos');
      setVehiculos(response.data.data);
    } catch (err) {
      console.error('Error al cargar vehículos:', err);
      setError('Error al cargar los vehículos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const addVehiculo = async (vehiculo: Omit<Vehiculo, 'id'>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/vehiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehiculo),
      });

      const data = await response.json();

      if (data.success) {
        await fetchVehiculos(); // Refrescar la lista después de agregar
        return true;
      } else {
        setError(data.message || 'Error al agregar el vehículo');
        return false;
      }
    } catch (err) {
      console.error('Error al agregar vehículo:', err);
      setError('Error al agregar el vehículo. Por favor, intente nuevamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const importVehiculos = async (file: File): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        await fetchVehiculos(); // Refrescar la lista después de importar
        return true;
      } else {
        setError(data.message || 'Error al importar vehículos');
        return false;
      }
    } catch (err) {
      console.error('Error al importar vehículos:', err);
      setError('Error al importar vehículos. Por favor, intente nuevamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cargar vehículos al montar el componente
  useEffect(() => {
    fetchVehiculos();
  }, []);

  return (
    <VehiculoContext.Provider
      value={{
        vehiculos,
        loading,
        error,
        fetchVehiculos,
        addVehiculo,
        importVehiculos
      }}
    >
      {children}
    </VehiculoContext.Provider>
  );
};

export default VehiculoContext;