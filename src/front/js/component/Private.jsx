import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Private = ({ element }) => {
  const navigate = useNavigate();
// recordatorio element hace referencia a la ruta en el layout (prop desestructurado) xra especificar 
// que componente debe ser renderizado cdo se active la ruta privada, puedo llamarlo como quiera
// mientras tb lo modifique en el layout
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return element;
};

