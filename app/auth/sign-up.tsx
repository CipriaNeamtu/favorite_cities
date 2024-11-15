'use client'

import { Fieldset, Input, Stack, Button, Flex } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useState } from "react"

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
		console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ handleSubmit ~ response:', response)
	};

	return (
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
					<Button type="submit" name="signIn">Sign In</Button>
					<Button type="submit" name="login">Login</Button>
				</Flex>
			</Fieldset.Root>
		</form>
	);
}