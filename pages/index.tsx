import type { NextPage } from 'next';
import React from 'react';
import { List } from '../components/List';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Button, Center, Container, Spinner } from '@chakra-ui/react';
import { Filters } from '../components/Filters';

const Home: NextPage = () => {
	const { result, isLoading, loadMore, canLoadMore } = useFetchProducts({});

	return (
		<Container maxW="container.md" centerContent={isLoading}>
			{isLoading ?
				<Spinner />
				:
				<React.Fragment>
					<Filters />
					<List result={result} />
					{canLoadMore && <Center>
						<Button colorScheme='blue' onClick={loadMore} marginTop="4">Load more</Button>
					</Center>}
				</React.Fragment>
			}
		</Container>
	);
};

export default Home;