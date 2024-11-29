import { Text, Spinner, VStack, Flex } from "@chakra-ui/react"

const Loading = () => {
	return (
		<Flex width={'full'} height={'80vh'} alignItems={'center'} justifyContent={'center'}>
			<VStack colorPalette="blue">
				<Spinner color="colorPalette.600" />
				<Text color="colorPalette.600">Loading...</Text>
			</VStack>
		</Flex>
	)
}

export default Loading