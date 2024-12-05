'use client'

import {
	TableRoot,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableColumnHeader,
	TableCell,
	Container,
	Box,
	Image,
} from "@chakra-ui/react";
import { useAuth } from '../context/Auth'
import Loading from '../components/Loading';
import { PAGE } from '../constants';
import { useRouter } from 'next/navigation';
import { getUsers, deleteUser } from "../services/userService";
import { useEffect, useState } from "react";
import { User } from "../definitions";
import { MdDeleteForever } from "react-icons/md";
import Dialog from "../components/Dialog";

const Page = () => {
	const route = useRouter();
	const { currentUser } = useAuth();
	const [users, setUsers] = useState<User[] | []>([]);
	const [message, setMessage] = useState<string | null>(null);
	
	const getAllUsers = async () => {
		if (currentUser) {
			const data = await getUsers(currentUser?.email);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setUsers(data);
		}
	}

	const handleDelete = async (user: User) => {
		try {
			const { message } = await deleteUser(user.id);
			setMessage(message);
		} catch (error) {
			console.error('Unexpected error:', error);
		}
	}

	useEffect(() => {
		getAllUsers();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, message])

	if (!currentUser) return <Loading />
	
	if (currentUser?.role !== 'admin' && users.length != 0) {
		route.push(PAGE.HOME);
		return;
	}

	return (
		<Container pb={'48'}>
			Admin Dashboard

			<Box padding="4" bg="gray.50" borderRadius="md" boxShadow="sm">
			<TableRoot>
			<TableHeader>
				<TableRow>
					<TableColumnHeader>Name</TableColumnHeader>
					<TableColumnHeader>Email</TableColumnHeader>
					<TableColumnHeader>Email Verified</TableColumnHeader>
					<TableColumnHeader>Image</TableColumnHeader>
					<TableColumnHeader>Created At</TableColumnHeader>
					<TableColumnHeader>Updated At</TableColumnHeader>
					<TableColumnHeader>Delete</TableColumnHeader>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users?.map((user, index) => (
					<TableRow key={index}>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
						<TableCell>
							<Image src={user?.image ?? undefined} alt={`${user.name}'s avatar`} />
						</TableCell>
						<TableCell>{user.createdAt?.toLocaleString()}</TableCell>
						<TableCell>{user.updatedAt?.toLocaleString()}</TableCell>
						<TableCell><MdDeleteForever color={'red'} size={30} cursor={'pointer'} onClick={() => handleDelete(user)}/></TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={7}>Total Users: {users?.length}</TableCell>
				</TableRow>
			</TableFooter>
		</TableRoot>
		</Box>

		<Dialog 
				title='User Status' 
				text={message ?? ''} 
				open={message ? true : false} 
				onOpenChange={() =>setMessage(null)} 
				onSave={() =>setMessage(null)}
			/>
		</Container>
	)
}

export default Page