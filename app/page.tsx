'use client'

import { Box, Container, Flex } from "@chakra-ui/react";
import { useAuth } from "./context/Auth";

export default function Home() {
  const { currentUser } = useAuth()
 
  return (
    <Container>
      <Flex flexDir={'column'}>
        <Box>Home Page</Box>
        {
          currentUser ? `You are logged in with email: ${currentUser.email}` : 'No user logged'
        }
      </Flex>
    </Container>
  );
}
