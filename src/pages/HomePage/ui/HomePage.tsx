import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { WithQuery } from '../../../1-shared/store/HOCs/WithQuery';
import { LoadMore } from '../../../1-shared/ui/LoadMore';
import { CardList } from '../../../4-widgets/CardList';
import { useProducts } from '../../../1-shared/store/hooks/useProducts';

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
