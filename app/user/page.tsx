'use client'

import { Button, Container, Flex, Input, List, Text } from "@chakra-ui/react"
import { useAuth } from "../context/Auth"
import { updateUser } from "../services/userService"
import { Avatar } from "@/components/ui/avatar"
import { MdEdit } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { CityType, User } from "../definitions"
import Loading from "../components/Loading"
import TemperatureChart from "../components/TemperatureChart"
import { LuCheckCircle } from "react-icons/lu"
import { useRouter } from "next/navigation"
import { PAGE } from "../constants"

const Page = () => {
	const { currentUser } = useAuth();
	const [updateField, setUpdateFiled] = useState('');
	const [user, setUser] = useState<User | null>(null);
	const [favoriteCities, setFavoriteCities] = useState<CityType[] | null>(null);
	const route = useRouter();

	const getFavoriteCities = async () => {
		const response = await fetch('/api/manageCity');
		const { allCities } = await response.json();
		setFavoriteCities(allCities);
	}
	
	const updateUserData = async () => {
		setUpdateFiled('');

		if (currentUser?.id && user) {
			await updateUser(currentUser.id, user)
		}
	}

	const handleInputChange = (value: string, input: string) => {
		if (user) {
			setUser(prevUser => ({
				...prevUser!,
				[input]: value
			}))
		}
	}

	const redirectToFavoritePage = () => {
		route.push(PAGE.FAVORITES);
	}

	useEffect(() => {
		if (currentUser) setUser(currentUser);
	},[currentUser])

	useEffect(() => {
		getFavoriteCities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!currentUser) {
		return (
			<Loading />
		)
	}

	return (
		<Container display={'flex'} flexDirection={'column'} pb={'48'}>
			
			<Flex mt={'10'} mb={'10'} gap={'4'} alignItems={'stretch'} height={'96'}>
				<Flex 
					flexDirection={'column'} 
					alignSelf={'flex-start'} 
					alignItems={'center'} 
					gap={'4'} 
					boxShadow={'xl'}
					padding={'10'}
					borderRadius={'2xl'}
					width={'full'}
					height={'full'}
					flex={'1'}
				>
					<Text textStyle={'2xl'} alignSelf={'flex-start'}>My Profile</Text>
					<Flex gap={'4'} mt={'4'} alignItems={'center'}>
						<Avatar name={currentUser?.name ?? 'User'} src={currentUser?.image ?? undefined} size={'2xl'} />
						<Tooltip content="In progress..." positioning={{ placement: 'top' }}>
							<Button colorPalette={'blue'}>Change Picture</Button>
						</Tooltip>
					</Flex>

					<Text textStyle={'md'} alignSelf={'flex-start'} mt={'6'}>User Details</Text>
					<Flex flexDirection={'column'} alignItems={'flex-start'}>
						<Flex gap={'2'} flexDirection={'column'}>
							<Flex gap={'2'} alignItems={'center'}>
								<Text textStyle={'md'} color={'gray.500'}>user name</Text>
								<Text textStyle={'md'} color={'blue.500'}>{currentUser?.name ?? 'User Name'}</Text>
								<Tooltip content="Edit user name" positioning={{ placement: 'top' }}>
									<MdEdit size={25} cursor={'pointer'} onClick={() => setUpdateFiled('name')} color="gray" />
								</Tooltip>
							</Flex>
							{ updateField === 'name' &&
								<>
									<Input 
										value={user?.name ?? 'name'} 
										colorPalette={'blue'} 
										onChange={(e) => handleInputChange(e.target.value, 'name')} 
									/>
									<Button colorPalette={'blue'} onClick={updateUserData}>Update</Button>
								</>
							}
						</Flex>

						<Flex gap={'2'} flexDirection={'column'} mt={'2'}>
							<Flex gap={'2'} alignItems={'center'}>
								<Text textStyle={'md'} color={'gray.500'}>email</Text>
								<Text textStyle={'md'} color={'blue.500'}>{currentUser?.email ?? 'Email'}</Text>
								<Tooltip content="Edit user name" positioning={{ placement: 'top' }}>
									<MdEdit size={25} cursor={'pointer'} onClick={() => setUpdateFiled('email')} color='gray' />
								</Tooltip>
							</Flex>
							{ updateField === 'email' && 
								<>
									<Input 
										value={user?.email ?? 'email'} 
										colorPalette={'blue'} 
										onChange={(e) => handleInputChange(e.target.value, 'email')} 
									/>
									<Button colorPalette={'blue'} onClick={updateUserData}>Update</Button>
								</>
							}
						</Flex>
					</Flex>
				</Flex>

				<Flex 
					flexDirection={'column'} 
					alignSelf={'flex-start'} 
					gap={'4'} 
					width={'full'} 
					height={'full'}
					boxShadow={'xl'}
					padding={'10'}
					borderRadius={'2xl'}
					flex={'1'}
					
				>	
					<Flex gap={'2'}>
						<Text textStyle={'2xl'} alignSelf={'flex-start'}>My Favorite Cities</Text>
						<Button colorPalette={'blue'} variant={'surface'} onClick={redirectToFavoritePage}>Manage</Button>
					</Flex>
					
					<List.Root gap="2" variant="plain" overflowY={'scroll'}>
						{ favoriteCities?.map((city, index) =>  (
							<List.Item key={index}>
								<List.Indicator asChild color="blue.500"><LuCheckCircle /></List.Indicator>
									{city.name}
							</List.Item>
						))}
					</List.Root>
					
				</Flex>
			</Flex>

			<TemperatureChart />
		</Container>
	)
}

export default Page