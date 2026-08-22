import { WithQuery } from '../../../1-shared/store/HOCs/WithQuery';
import { CardList } from '../../../widgets/CardList';
import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { useProducts } from '../../../1-shared/store/hooks/useProducts';
import { LoadMore } from '../../../1-shared/ui/LoadMore';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
  const { products, isLoading, isError, error } = useProducts();

  return (
    <>
      <CardListWithQuery
        title='Лакомства'
        isLoading={isLoading}
        isError={isError}
        products={products}
        error={error}
      />
      <LoadMore />
    </>
  );
});
