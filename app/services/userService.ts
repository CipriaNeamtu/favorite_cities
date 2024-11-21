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