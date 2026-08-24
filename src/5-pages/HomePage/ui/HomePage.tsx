import { WithProtection, WithQuery } from 'shared/store/HOCs';
import { useProducts } from 'shared/store/hooks';
import { LoadMore } from 'shared/ui/LoadMore';
import { CardList } from 'widgets/CardList';

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
