import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs";
import { UserEntity } from "@/app/entity/Users";
import { AppDataSource } from "./data-source";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (typeof credentials?.email != 'string' || typeof credentials?.password != 'string') {
					return null;
				}

				const { email, password } = credentials;

				if (!AppDataSource.isInitialized) {
					await AppDataSource.initialize();
				}
				const userRepository = AppDataSource.getRepository(UserEntity);

				const user = await userRepository.findOneBy({ email: email });

				if (!user || !user?.password) {
					return null;
				}

				const isPasswordValid = await bcryptjs.compare(password, user.password);

				if (!isPasswordValid) {
					return null; 
				}
				
				return user;
			},
		}),
	],
	pages: {
		signIn: "/signup",
	},
})

