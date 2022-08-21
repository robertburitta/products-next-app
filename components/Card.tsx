import React from 'react';
import { Box, Center, Divider, Image, Text } from '@chakra-ui/react';
import { Product } from '../types/Product';

interface CardProps {
	key: number;
	product: Product;
}

export const Card: React.FC<CardProps> = ({ product }) => {
	return (
		<Box display="flex" borderWidth="1px" borderRadius="lg" my="4" p="3" flexDir={{ base: 'column', md: 'row' }}>
			<Center width={{ base: 'auto', md: '40%' }} marginRight="4">
				<Image src={product.thumbnail} alt={product.title} borderRadius="lg" maxH={{ base: '200px', md: 'auto' }} />
			</Center>
			<Box width={{ base: 'auto', md: '60%' }}>
				<Text fontSize='xl'>{product.title}</Text>
				<Text fontSize='sm'>Category: {product.brand}</Text>
				<Divider my="2" />
				<Text fontSize='sm'>{product.description}</Text>
				<Text fontSize='2xl' mt="4">{product.price} $</Text>
			</Box>
		</Box>
	);
};