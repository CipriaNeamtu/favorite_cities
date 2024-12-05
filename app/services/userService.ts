'use server'

import { AppDataSource } from "../data-source";
import { User } from "../definitions";
import { UserEntity } from "../entity/Users";

export const getUserByEmailFromDataBase = async (email: string) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const userRepository = AppDataSource.getRepository(UserEntity);

	try {
		const user = await userRepository.findOneBy({ email: email });

		if (!user) {
			return null;
		}

		return { 
			id: user?.id, 
			name: user?.name,
			email: user?.email,
			image: user?.image,
			role: user?.role,
			emailVerified: user?.emailVerified,
			createdAt: user?.createdAt,
			updatedAt: user?.updatedAt
		};
	} catch (error) {
		console.error('userService::getUserByEmailFromDataBase:', error)
	}
}

export const updateUser = async (id: string, userData: User) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const userRepository = AppDataSource.getRepository(UserEntity);

	try {
		const user = await userRepository.findOneBy({ id: id });
		
		if (user && userData) {
			user.name = userData.name;
		}

		if (!user) {
			return null;
		}
		await userRepository.save(user);
		
	} catch (error) {
		console.error('userService::updateUser:', error)
	}
}

export const getUsers = async (email: string) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const userRepository = AppDataSource.getRepository(UserEntity);
	try {
		const user = await userRepository.findOneBy({ email: email });

		if (user?.role !== 'admin') {
			return null;
		}

		const users = await userRepository.find();

		const filteredUsers = users.map((user) => {
			return {
				id: user?.id, 
				name: user?.name,
				email: user?.email,
				image: user?.image,
				role: user?.role,
				emailVerified: user?.emailVerified,
				createdAt: user?.createdAt,
				updatedAt: user?.updatedAt,
			}
		})
		
		return filteredUsers;
		
	} catch (error) {
			console.error('userService::getUsers:', error)
	}
}

export const deleteUser = async (id: string) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const userRepository = AppDataSource.getRepository(UserEntity);

	try {
		const user = await userRepository.findOneBy({ id: id });

		if (!user) {
			return { message: 'User not found!'};
		}

		await userRepository.delete({ id: user?.id});

		return { message: `${user?.email} has been removed!` };
	} catch (error) {
		console.error('userService::deleteUser:', error)
		return { message: 'Something went wrong!' };
	}
}