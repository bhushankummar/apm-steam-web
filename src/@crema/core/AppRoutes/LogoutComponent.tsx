import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMethod } from '@crema/hooks/AuthHooks';

const LogoutComponent: React.FC = () => {
  const { logout } = useAuthMethod();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    sessionStorage.clear();
    navigate('/signin');
  }, [logout, navigate]);

  return null; 
};

export default LogoutComponent;
