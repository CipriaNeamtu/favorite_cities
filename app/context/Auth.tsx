/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { User } from '../definitions';
import React, { ReactNode, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserByEmailFromDataBase } from '../services/userService';

type AuthProviderProps = {
	children: ReactNode;
}

export interface AuthProps {
	currentUser?: User | null;
	getCurrentUser?: (user: User) => void;
}

const AuthContext = React.createContext<AuthProps | null>(null);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const { data: session } = useSession();
	
	const getCurrentUser = async (email: string) => {
		try {
			// @ts-expect-error
			const user: User = await getUserByEmailFromDataBase(email);
			if (user) {
				setCurrentUser(user)
			}
		} catch (error) {
			console.error('AuthContext::getCurrentUser:', error)
		}
	} 

	useEffect(() => {
		if (session?.user?.email) {
			getCurrentUser(session.user.email)
		}
	}, [session])

	const value: AuthProps = {
		currentUser,
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
