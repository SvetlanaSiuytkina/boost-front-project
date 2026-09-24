import { Box, Input, Image, Flex } from '@chakra-ui/react';

interface TopBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const BASE_URL = import.meta.env.BASE_URL;

export const TopBar = ({ searchValue, onSearchChange }: TopBarProps) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="flex-end"
      px={8}
      py={3}
      borderBottom="1px"
      borderColor="border"
      bg="white"
      position="sticky"
      top={0}
      zIndex={5}
    >
      <Flex align="center" gap={3}>
        {/* Поиск */}
        <Box position="relative" w="280px">
          <Box
            position="absolute"
            left="10px"
            top="50%"
            transform="translateY(-50%)"
            w="16px"
            h="16px"
            pointerEvents="none"
            opacity={0.5}
          >
            <Image
              src={`${BASE_URL}icons/main/leading.svg`}
              alt="Поиск"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
          <Input
            pl="34px"
            placeholder="Поиск"
            size="sm"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Box>

        {/* Аватар */}
        <Box w="32px" h="32px" borderRadius="full" overflow="hidden" bg="components.bg">
          <Image
            src={`${BASE_URL}icons/main/avatar.svg`}
            alt="Профиль"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Flex>
  );
};