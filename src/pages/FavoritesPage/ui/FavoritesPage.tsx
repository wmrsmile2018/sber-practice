import { WithQuery } from '../../../1-shared/store/HOCs/WithQuery';
import { CardList } from '../../../widgets/CardList';
import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { useProducts } from '../../../1-shared/store/hooks/useProducts';
import { ButtonBack } from '../../../1-shared/ui/ButtonBack';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
  const { isLoading, isError, products, error } = useProducts();

  return (
    <>
      <br />
      <ButtonBack />
      <CardListWithQuery
        title='Избранные'
        isLoading={isLoading}
        isError={isError}
        products={products}
        error={error}
      />
    </>
  );
});
