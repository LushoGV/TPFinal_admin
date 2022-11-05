import { useLocation, useNavigate as Navigate } from 'react-router-dom';

const useNavigate = () => {
  const navigate = Navigate();
  const location = useLocation();

  return {
    push: navigate,
    go: navigate,
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    location,
  };
};

export default useNavigate;
