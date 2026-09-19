import { Box, Stack, Button, Text, Image, Flex } from '@chakra-ui/react';

const navItems = [
  { label: 'Главная', icon: '/icons/main/home.svg', active: false },
  { label: 'Аналитика', icon: '/icons/main/pie-chart.svg', active: false },
  { label: 'Орг. структура', icon: '/icons/main/case.svg', active: false },
  { label: 'Сотрудники', icon: '/icons/main/users.svg', active: false },
  { label: 'Boost', icon: '/icons/main/star.svg', active: true },
  { label: 'Опросы', icon: '/icons/main/question.svg', active: false },
  { label: 'Поиск', icon: '/icons/main/leading.svg', active: false },
  { label: 'Справка', icon: '/icons/main/about.svg', active: false },
];

const footerItems = [
  { label: 'Уведомления', icon: '/icons/main/bell.svg' },
  { label: 'Настройки', icon: '/icons/main/settings.svg' },
];

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
      {/* Логотип */}
      <Box p={6} borderBottom="1px" borderColor="border">
        <Text 
          fontWeight="bold" 
          fontSize="xl" 
          color="primary.text" 
          textTransform="uppercase"
        >
          СИГМА
        </Text>
      </Box>

      <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
        <Stack p={4} gap={1}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? 'solid' : 'ghost'}
              bg={item.active ? 'primary.bg' : undefined}
              color={item.active ? 'primary.text' : 'secondary.text'}
              _hover={{
                bg: item.active ? 'primary.hover' : 'components.bg',
                color: item.active ? 'primary.text' : 'primary.text',
              }}
              justifyContent="start"
              size="md"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              gap={3}
              w="full"
              textAlign="left"
            >
              <Box w="20px" h="20px" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Image 
                  src={item.icon} 
                  alt={item.label} 
                  objectFit="contain" 
                  w="full" 
                  h="full" 
                />
              </Box>
              <Text whiteSpace="nowrap">{item.label}</Text>
            </Button>
          ))}
        </Stack>

        <Box h="1px" bg="border" my={4} mx={4} />

        <Stack p={4} gap={1} mt="auto">
          {footerItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              color="secondary.text"
              _hover={{
                bg: 'components.bg',
                color: 'primary.text',
              }}
              justifyContent="start"
              size="md"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              gap={3}
              w="full"
              textAlign="left"
            >
              <Box w="20px" h="20px" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Image 
                  src={item.icon} 
                  alt={item.label} 
                  objectFit="contain" 
                  w="full" 
                  h="full" 
                />
              </Box>
              <Text whiteSpace="nowrap">{item.label}</Text>
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Профиль */}
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
              src="/icons/main/avatar.svg" 
              alt="Avatar" 
              objectFit="contain" 
              w="24px" 
              h="24px" 
            />
          </Box>
          
          <Box flex="1" minW={0}>
            <Text fontWeight="bold" fontSize="sm" color="primary.text">Мария</Text>
            <Text color="secondary.text" fontSize="xs">mail@gmail.com</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};