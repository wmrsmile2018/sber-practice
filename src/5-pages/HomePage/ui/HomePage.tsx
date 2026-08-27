import { useLoadMore } from 'features/loadMore/model/useLoadMore';
import { ChangeEvent, memo, useRef } from 'react';
import { WithProtection, WithQuery } from 'shared/store/HOCs';
import { useProducts } from 'shared/store/hooks';
import { CardList } from 'widgets/CardList';
import { Alert, CircularProgress, Stack } from '@mui/material';
import s from './HomePage.module.css';
import classNames from 'classnames';
import { useSort } from 'features/sort/model/useSort';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(
  memo(() => {
    const { products, isLoading, isError, error } = useProducts();
    const ref = useRef<HTMLDivElement>(null);
    const { isEndOfList, isFetching } = useLoadMore({ ref });
    const { sort, setSort, sortParams } = useSort();
    const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      const newSort = e.target.value as Sort;
      setSort(newSort);
    };

    return (
      <div className={`${classNames(s['container'])}`}>
        <select value={sort} onChange={handleSortSelect}>
          {sortParams.map((p) => (
            <option key={p.title} value={p.value}>
              {p.title}
            </option>
          ))}
        </select>
        <CardListWithQuery
          title='Лакомства'
          isLoading={isLoading}
          isError={isError}
          products={products}
          error={error}
        />
        <Stack ref={ref} direction='row' sx={{ my: 5 }}>
          {isFetching && <CircularProgress />}
          {isEndOfList && <Alert severity='success'>End of list!</Alert>}
        </Stack>
      </div>
    );
  }),
);
