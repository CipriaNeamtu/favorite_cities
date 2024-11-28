import { Tooltip } from "@/components/ui/tooltip";
import { Box, Flex, Text } from "@chakra-ui/react";
import { 
	SlSocialLinkedin, 
	SlSocialInstagram, 
	SlSocialGoogle, 
	SlSocialFacebook, 
	SlSocialTwitter,
} from "react-icons/sl";

const Footer = () => {
	const socialMediaIcons = [
		{	name: <SlSocialInstagram /> },
		{	name: <SlSocialGoogle /> },
		{	name: <SlSocialFacebook /> },
		{	name: <SlSocialTwitter /> },
		{	name: <SlSocialLinkedin /> },
	];

	return (
		<Flex 
			justify={'center'} 
			alignItems={'center'}
			flexDir={'column'}
			gap={'2'}
			boxShadow={'0 -4px 6px rgba(0, 0, 0, 0.1)'} 
			position={'fixed'} 
			bottom={0} 
			zIndex={10} 
			width={'full'} 
			height={'32'} 
			as={'footer'} 
			overflow={'hidden'}
			bg={'whiteAlpha.900'}
			p={'4'}
			>
			FAVORITE CITIES
			<Flex gap={'2'}>
			{ socialMediaIcons.map((icon, index) => {
						return (
							<Tooltip key={index} content='Only for design' positioning={{ placement: 'top' }}>
								<Box cursor={'pointer'}>{icon.name}</Box>
							</Tooltip>
						)
					})} 
			</Flex>
			<Text>© Favorite Cities. All rights reserved.</Text>
		</Flex>	
	)
}

export default Footer;