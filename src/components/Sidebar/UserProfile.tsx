import { Flex, Text, Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

interface UserProfileProps {
  name?: string;
  email?: string;
}

export const UserProfile = ({
  name = 'Мария',
  email = 'mail@gmail.com',
}: UserProfileProps) => (
  <Box borderTop="1px" borderColor="border" p={4} flexShrink={0}>
    <Flex align="center" gap={3}>
      <Box
        w="40px"
        h="40px"
        rounded="full"
        bg="components.bg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Image
          src={`${import.meta.env.BASE_URL}icons/main/avatar.svg`}
          alt="Avatar"
          objectFit="contain"
          w="24px"
          h="24px"
        />
      </Box>

      <Box flex="1" minW={0}>
        <Text fontWeight="bold" fontSize="sm" color="primary.text">
          {name}
        </Text>
        <Text color="secondary.text" fontSize="xs">
          {email}
        </Text>
      </Box>
    </Flex>
  </Box>
);