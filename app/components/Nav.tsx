import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { ColorModeButton } from "@/components/ui/color-mode";
import { PAGE } from '@/app/constants'
import { FaHome } from 'react-icons/fa';
import { MdFavorite } from "react-icons/md";
import { MdLocationCity } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  const navButtons = [
    { name: 'Home', pathName: PAGE.HOME, icon: <FaHome /> },
    { name: 'Search', pathName: PAGE.SEARCH, icon: <IoIosSearch /> },
    { name: 'City', pathName: PAGE.CITY, icon: <MdLocationCity /> },
    { name: 'Favorites', pathName: PAGE.FAVORITES, icon: <MdFavorite /> },
  ];

  return (
    <Flex justify={'space-between'} align={'center'} padding={'5'} as={'nav'} boxShadow={'md'} mb={'10'}>
      <Box>Favorite Cities</Box>

      <Flex justify={'center'} gap={'10'}>
        { navButtons.map((button, index) => (
          <Link key={index} href={button.pathName} textDecoration="none" outline="none">
            {button.icon}
            {button.name}
          </Link>
        ))}
      </Flex>

      <Flex gap={'4'}>
        <ColorModeButton />
        <Link href={PAGE.SIGNUP} textDecoration="none">
          <Button colorPalette={'blue'}>Sign Up</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Nav