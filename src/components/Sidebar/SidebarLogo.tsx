import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

export const SidebarLogo = () => (
  <Box p={6} borderBottom="1px" borderColor="border">
    <Image
      src={`${import.meta.env.BASE_URL}icons/main/logo.svg`}
      alt="СИГМА"
      objectFit="contain"
      w="auto"
      h="40px"
      style={{ display: 'block' }}
    />
  </Box>
);