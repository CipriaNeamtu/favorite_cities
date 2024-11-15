import { Flex } from "@chakra-ui/react"
import SignUp from "../auth/sign-up"

const page = () => {
	return (
		<Flex justify={'center'} align={'center'}>
			<Flex padding={'16'} boxShadow={'lg'} borderRadius={'xl'}>
				<SignUp />
			</Flex>
		</Flex>
	)
}

export default page	