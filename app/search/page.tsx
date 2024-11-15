'use client'

import { Box, Container } from "@chakra-ui/react";
import { HStack, Input, Kbd } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { LuSearch } from "react-icons/lu"
import { useState } from "react";

const Page = () => {
	const [cities, setCities] = useState<string[] | null>(null);
	const search = async (cityName: string) => {
		const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=ro&format=json`);
		const { results } = await response.json();
		setCities(results);
	}
	return (
		<Container>
			Search Page

			<HStack gap="10" width="full">
      <InputGroup colorPalette={'blue'} flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>} >
        <Input placeholder="Search city" onChange={(e) => search(e.target.value)} />
      </InputGroup>
    </HStack>

		{ cities && 
			cities.map((city, index) => (
				<Box key={index}>{city.name}</Box>
			))
		}
		</Container>
	)
}

export default Page