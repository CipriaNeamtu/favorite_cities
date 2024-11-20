'use client'

import { Container, Card, Button, Flex, Text, Box } from "@chakra-ui/react";
import { HStack, Input, Kbd } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { LuSearch } from "react-icons/lu"
import { useState } from "react";
import { CityType } from "../definitions";
import { useRouter } from "next/navigation";
import { PAGE } from "../constants";

const Page = () => {
	const [cities, setCities] = useState<CityType[] | null>(null);
	const router = useRouter();

	const search = async (cityName: string) => {
		const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`);
		const { results } = await response.json();
		setCities(results);
	}

	const sendDetails = (city: CityType) => {
		router.push(`${PAGE.CITY}/${city.name}`)
	}

	return (
		<Container display={'flex'} flexDirection={'column'}>
			Search Page

			<Flex flexDirection={'column'} mt={'6'}>
				<Text textStyle={'sm'}>Want to learn more about a city? Start typing its name here!</Text>
				<Text textStyle={'sm'}>Looking for a place? Type a city and let’s explore!</Text>
			</Flex>

			<HStack gap="10" width="full" mt={'2'}>
				<InputGroup colorPalette={'blue'} flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>} >
					<Input placeholder="Search city" onChange={(e) => search(e.target.value)} />
				</InputGroup>
			</HStack>
			
			<Flex wrap={'wrap'} gap={'10'} justifyContent={'space-between'} mt={'10'} maxW={'4/5'} alignSelf={'center'}>
				{cities &&
					cities.map((city, index) => (
						<Card.Root width="320px" key={index}>
							<Card.Body gap="2">
								<Card.Title mt="2">{city.name}</Card.Title>
								<Flex flexDirection={'column'}>
									<Box>This city is located in {city.country}</Box>
									<Box gap={'1'} display={'flex'}>And has a population of {city.population ?? 'unknown'} citizens</Box>
								</Flex>
							</Card.Body>
							<Card.Footer justifyContent="flex-end">
								<Button colorPalette={'blue'} onClick={() => sendDetails(city)}>Details</Button>
							</Card.Footer>
						</Card.Root>
					))
				}
			</Flex>
		</Container>
	)
}

export default Page