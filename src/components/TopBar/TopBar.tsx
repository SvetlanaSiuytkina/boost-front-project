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
      justify={{ base: 'flex-start', md: 'flex-end' }}
      px={{ base: 4, md: 6, lg: 8 }}
      py={3}
      borderBottom="1px"
      borderColor="border"
      bg="white"
      position="sticky"
      top={0}
      zIndex={5}
      gap={3}
    >
      {/* Отступ под кнопку-бургер на мобилке */}
      <Box display={{ base: 'block', lg: 'none' }} w="40px" flexShrink={0} />

      <Flex align="center" gap={{ base: 2, md: 3 }} flex={{ base: '1', md: '0 0 auto' }}>
        <Box
          position="relative"
          w={{ base: '100%', md: '280px' }}
          maxW={{ base: '100%', md: '280px' }}
          flex={{ base: '1', md: '0 0 auto' }}
        >
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
            w="100%"
          />
        </Box>

        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          overflow="hidden"
          bg="components.bg"
          flexShrink={0}
          display={{ base: 'none', md: 'block' }}
        >
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