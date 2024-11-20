'use client'

import { Flex } from "@chakra-ui/react"
import SignUp from "../components/SignUp"

const Page = () => {
	return (
		<Flex justify={'center'} align={'center'}>
			<Flex padding={'16'} boxShadow={'lg'} borderRadius={'xl'}>
				<SignUp />
			</Flex>
		</Flex>
	)
}

export default Page	