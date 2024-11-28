'use client'

import { Container, Badge, Box, Card, HStack, Image, Button, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { CityType } from "../definitions";

const Page = () => {
	const [favoriteCities, setFavoriteCities] = useState<CityType[] | null>(null);

	const getFavoriteCities = async () => {
		const response = await fetch('/api/manageCity');
		const { allCities } = await response.json();
		setFavoriteCities(allCities);
	}
	
	const deleteCity = async (city: CityType) => {
		await fetch('/api/manageCity', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(city),
		});
	}

	useEffect(() => {
		getFavoriteCities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!favoriteCities) return <Loading />

	return (
		<Container justifyContent={'center'} pb={'48'}>
			Favorites Page

			<Flex gap={'6'} flexWrap={'wrap'} justifyContent={'center'}>
				{favoriteCities ? favoriteCities.map((city: CityType, index: number) => (
					<Card.Root flexDirection="row" overflow="hidden" maxW="xl" key={index}>
						<Image
							objectFit="cover"
							maxW="200px"
							src={city.imageUrl ?? undefined}
							alt="Caffe Latte"
						/>
						<Box>
							<Card.Body>
								<Card.Title mb="2">{city.name}</Card.Title>
								<Flex flexDirection={'column'} gap={'2'}>
									<Box>Country: {city.country}</Box>
									<Box>Population: {city.population}</Box>
								</Flex>
								<HStack mt="4">
									<Badge>Latitude: {city.latitude}</Badge>
									<Badge>Longitude: {city.longitude}</Badge>
								</HStack>
							</Card.Body>
							<Card.Footer>
								<Button variant={'outline'} colorPalette={'blue'} onClick={() => deleteCity(city)}>Delete City</Button>
							</Card.Footer>
						</Box>
					</Card.Root>
				))
					:
					<Box>Nothing to show!</Box>
				}
			</Flex>
		</Container>
	)
}

export default Page;