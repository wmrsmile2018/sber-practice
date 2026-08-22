import { useNavigate } from 'react-router-dom';
import { BackUIIcon } from 'shared/assets';

export const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <BackUIIcon />
    </button>
  );
};
