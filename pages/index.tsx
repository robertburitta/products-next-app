import type { NextPage } from 'next';
import React from 'react';
import { List } from '../components/List';
import { Filters } from '../components/Filters';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Button, Center, Container, Divider, Spinner } from '@chakra-ui/react';

const Home: NextPage = () => {
	const { result, isLoadingProducts, loadMore, canLoadMore, searchByCategory, categories, isLoadingCategories } = useFetchProducts({});

	return (
		<Container maxW={{ base: 'container.sm', md: 'container.md' }}>
			{isLoadingProducts && Object.keys(result).length === 0 ?
				<Center>
					<Spinner />
				</Center>
				:
				<React.Fragment>
					<Filters isLoadingCategories={isLoadingCategories} categories={categories} searchByCategory={searchByCategory} />
					<Divider my="3" />
					<List result={result} />
					{canLoadMore &&
						<Center>
							<Button colorScheme='blue' onClick={loadMore} my="5" isLoading={isLoadingProducts}>Load more</Button>
						</Center>
					}
				</React.Fragment>
			}
		</Container>
	);
};

export default Home;