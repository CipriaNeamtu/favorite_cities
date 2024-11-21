'use client'

import { Box, Container, Flex } from "@chakra-ui/react";
import { useAuth } from "./context/Auth";
import Loading from "./components/Loading";

export default function Home() {
  const { currentUser, isLoading } = useAuth()

  if (isLoading) return <Loading />
 
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