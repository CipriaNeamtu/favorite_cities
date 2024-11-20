'use client'

import { Fieldset, Input, Stack, Button, Flex } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useState } from "react"
import Dialog from "./Dialog";
import { useRouter } from "next/navigation";
import { PAGE } from "../constants";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState<string | null>(null);

	const route = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		/* For Typescript check
			Default: const buttonName = e.nativeEvent.submitter.name; 
		*/
		const nativeEvent = event.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement | null;
    const buttonName = submitter?.name;

		const endpoint =  buttonName === 'signIn' ? '/api/auth/register' : '/api/auth/login';

		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		
		if (response.status === 200) {
			const { message } = await response.json();
			setMessage(message);
		}
	};

	const redirectTo = () => {
		setMessage(null);
		route.push(PAGE.HOME);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Fieldset.Root size="lg" maxW="md">
					<Stack>
						<Fieldset.Legend>Sign Up Form</Fieldset.Legend>
						<Fieldset.HelperText>
							Please provide your account details below.
						</Fieldset.HelperText>
					</Stack>

					<Fieldset.Content>
						<Field label="Email address">
							<Input 
								name="email" 
								type="email" 
								value={email}
								onChange={(e) => setEmail(e.target.value)} 
							/>
						</Field>

						<Field label="Password">
							<Input 
								name="password" 
								type="password" 
								value={password}	
								onChange={(e) => setPassword(e.target.value)} 
							/>
						</Field>
					</Fieldset.Content>
					
					<Flex gap={'4'}>
						<Button type="submit" name="signIn">Register</Button>
						<Button type="submit" name="login">Sign In</Button>
					</Flex>
				</Fieldset.Root>
			</form>

			<Dialog 
				title='User status' 
				text={message ?? ''} 
				open={message ? true : false} 
				onOpenChange={() =>setMessage(null)} 
				onSave={redirectTo}
			/>
		</>
	);
}