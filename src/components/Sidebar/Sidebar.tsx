import { Box } from '@chakra-ui/react';
import { SidebarLogo } from './SidebarLogo';
import { NavMenu } from './NavMenu';
import { FooterMenu } from './FooterMenu';
import { UserProfile } from './UserProfile';

export const Sidebar = () => {
  return (
    <Box
      w="240px"
      bg="background"
      borderRight="1px"
      borderColor="border"
      h="100vh"
      position="fixed"
      zIndex={10}
      display="flex"
      flexDirection="column"
    >
      <SidebarLogo />
      <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
        <NavMenu />
        <Box h="1px" bg="border" my={4} mx={4} />
        <FooterMenu />
      </Box>
      <UserProfile />
    </Box>
  );
};