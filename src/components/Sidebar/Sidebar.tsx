// src/components/Sidebar/Sidebar.tsx
import { Box, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { SidebarLogo } from './SidebarLogo';
import { NavMenu } from './NavMenu';
import { FooterMenu } from './FooterMenu';
import { UserProfile } from './UserProfile';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* Кнопка-бургер — только на мобилке и планшете */}
      <IconButton
        aria-label="Открыть меню"
        position="fixed"
        top="12px"
        left="12px"
        zIndex={30}
        display={{ base: 'flex', lg: 'none' }}
        onClick={toggle}
        bg="white"
        border="1px"
        borderColor="border"
        borderRadius="md"
        size="sm"
      >
        ☰
      </IconButton>

      {/* Затемнение фона, когда сайдбар открыт на мобилке */}
      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.500"
          zIndex={19}
          display={{ base: 'block', lg: 'none' }}
          onClick={close}
        />
      )}

      {/* Сайдбар */}
      <Box
        w="240px"
        bg="background"
        borderRight="1px"
        borderColor="border"
        h="100vh"
        position="fixed"
        top={0}
        left={0}
        zIndex={20}
        display="flex"
        flexDirection="column"
        transform={{
          base: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          lg: 'translateX(0)',
        }}
        transition="transform 0.25s ease"
      >
        <SidebarLogo />
        <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
          <NavMenu onItemClick={close} />
          <Box h="1px" bg="border" my={4} mx={4} />
          <FooterMenu />
        </Box>
        <UserProfile />
      </Box>
    </>
  );
};