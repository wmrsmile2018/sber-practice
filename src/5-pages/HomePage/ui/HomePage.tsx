import { useLoadMore } from 'features/loadMore/model/useLoadMore';
import { memo, useRef } from 'react';
import { WithProtection, WithQuery } from 'shared/store/HOCs';
import { useProducts } from 'shared/store/hooks';
import { CardList } from 'widgets/CardList';
import { Alert, CircularProgress, Stack } from '@mui/material';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(
  memo(() => {
    const { products, isLoading, isError, error } = useProducts();
    const ref = useRef<HTMLDivElement>(null);
    const { isEndOfList, isFetching } = useLoadMore({ ref });

    return (
      <>
        <CardListWithQuery
          title='Лакомства'
          isLoading={isLoading}
          isError={isError}
          products={products}
          error={error}
        />
        <Stack
          ref={ref}
          direction='row'
          // justifyContent='center'
          // alignItems='center'
          sx={{ my: 5 }}
        >
          {isFetching && <CircularProgress />}
          {isEndOfList && <Alert severity='success'>End of list!</Alert>}
        </Stack>
      </>
    );
  }),
);
