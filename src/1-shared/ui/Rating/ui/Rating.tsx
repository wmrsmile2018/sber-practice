import { StarUIIcon } from 'shared/assets';

type TRating = {
  rating?: number;
  isEdit?: boolean;
  onChange?: (rating: number) => void;
};
export const Rating = ({ rating = 0, isEdit = false, onChange }: TRating) => {
  return (
    <div>
      {[...Array(5)].map((_e, i) => (
        <span key={i} style={{ cursor: isEdit ? 'pointer' : 'default' }}>
          <StarUIIcon
            onClick={() => onChange?.(i)}
            fill={i <= rating ? 'gold' : 'gray'}
          />
        </span>
      ))}
    </div>
  );
};
