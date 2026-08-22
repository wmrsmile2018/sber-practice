import { useNavigate } from 'react-router-dom';
import BackSvg from '../../../assets/icons/back.svg';

export const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <BackSvg />
    </button>
  );
};
