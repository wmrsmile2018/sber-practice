import { WithProtection, WithQuery } from 'shared/store/HOCs';
import { useProducts } from 'shared/store/hooks';
import { ButtonBack } from 'shared/ui/ButtonBack';
import { CardList } from 'widgets/CardList';

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
