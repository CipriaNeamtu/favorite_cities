'use client'

import { Button, Container, Flex, Input, Text } from "@chakra-ui/react"
import { useAuth } from "../context/Auth"
import { updateUser } from "../services/userService"
import { Avatar } from "@/components/ui/avatar"
import { MdEdit } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { User } from "../definitions"
import Loading from "../components/Loading"

const Page = () => {
	const { currentUser } = useAuth();
	const [updateField, setUpdateFiled] = useState('');
	const [user, setUser] = useState<User | null>(null);
	
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

	useEffect(() => {
		if (currentUser) setUser(currentUser);
	},[currentUser])

	if (!currentUser) {
		return (
			<Loading />
		)
	}

	return (
		<Container display={'flex'} flexDirection={'column'}>
			<Flex flexDirection={'column'} alignSelf={'center'} mt={'10'} alignItems={'center'} gap={'4'}>
				<Text textStyle={'2xl'} alignSelf={'flex-start'}>My Profile</Text>
				<Flex gap={'4'} mt={'4'} alignItems={'center'}>
					<Avatar name={currentUser?.name ?? 'User'} src={currentUser?.image ?? ''} size={'2xl'} />
					<Tooltip content="In progress..." positioning={{ placement: 'top' }}>
						<Button colorPalette={'blue'}>Change Picture</Button>
					</Tooltip>
				</Flex>

				<Text textStyle={'md'} alignSelf={'flex-start'} mt={'6'}>User Details</Text>
				<Flex flexDirection={'column'} alignItems={'flex-start'}>
					<Flex gap={'2'} flexDirection={'column'}>
						<Flex gap={'2'} alignItems={'center'}>
							<Text textStyle={'xl'} color={'gray.500'}>Name:</Text>
							<Text textStyle={'xl'}>{currentUser?.name ?? 'User Name'}</Text>
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

					<Flex gap={'2'} flexDirection={'column'} mt={'6'}>
						<Flex gap={'2'} alignItems={'center'}>
							<Text textStyle={'xl'} color={'gray.500'}>Email:</Text>
							<Text textStyle={'xl'}>{currentUser?.email ?? 'Email'}</Text>
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
		</Container>
	)
}

export default Page