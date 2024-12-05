'use client'

import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { ColorModeButton } from "@/components/ui/color-mode";
import { PAGE } from '@/app/constants'
import { FaHome } from 'react-icons/fa';
import { MdFavorite } from "react-icons/md";
import { MdLocationCity } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { signOut, signIn } from 'next-auth/react';
import { useAuth } from '../context/Auth';
import { Avatar } from "@/components/ui/avatar"
import { Tooltip } from '@/components/ui/tooltip';

const Nav = () => {
  const navButtons = [
    { name: 'Home', pathName: PAGE.HOME, icon: <FaHome /> },
    { name: 'Search', pathName: PAGE.SEARCH, icon: <IoIosSearch /> },
    { name: 'City', pathName: PAGE.CITY, icon: <MdLocationCity /> },
    { name: 'Favorites', pathName: PAGE.FAVORITES, icon: <MdFavorite /> },
    { name: 'Dashboard', pathName: PAGE.DASHBOARD, icon: <RiAdminFill /> },
  ];

  const { currentUser } = useAuth()

  return (
    <Flex justify={'space-between'} align={'center'} padding={'5'} as={'nav'} boxShadow={'md'} mb={'10'}>
      <Box>Favorite Cities</Box>

      <Flex justify={'center'} gap={'10'}>
        { navButtons.map((button, index) => (
          button.name === 'Dashboard' && currentUser?.role !== 'admin' ? (
            null
          ) : (
            <Link key={index} href={button.pathName} textDecoration="none" outline="none">
              {button.icon}
              {button.name}
            </Link>
          )
        ))}
      </Flex>

      <Flex gap={'4'} alignItems={'center'}>
        <ColorModeButton />
        { currentUser && 
          <Tooltip content={currentUser?.name ?? 'User Profile'} positioning={{ placement: 'left' }}>
            <Link href={PAGE.USER} textDecoration="none" outline="none" cursor={'pointer'}>
               <Avatar name={currentUser?.name ?? 'User'} src={currentUser?.image ?? undefined} />
            </Link>
          </Tooltip>
        }
        
        { currentUser ? 
          <Button colorPalette={'blue'} onClick={() => signOut()}>Sign Out</Button>
          :
          <Button colorPalette={'blue'} onClick={() => signIn()}>Sign In</Button>
        }
      </Flex>
    </Flex>
  )
}

export default Nav