import { Box, Stack, Button, Text } from '@chakra-ui/react';

export const Sidebar = () => {
  const navItems = [
    { label: 'Главная', active: false },
    { label: 'Аналитика', active: false },
    { label: 'Орг. структура', active: false },
    { label: 'Сотрудники', active: false },
    { label: 'Boost', active: true },
    { label: 'Опросы', active: false },
    { label: 'Поиск', active: false },
    { label: 'Справка', active: false },
  ];

  return (
    <Box
      w="240px"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      h="100vh"
      position="fixed"
      zIndex={10}
    >
      <Box p={6} borderBottom="1px" borderColor="gray.100">
        <Text fontWeight="bold" fontSize="xl" color="indigo.600" textTransform="uppercase">
          СИГМА
        </Text>
      </Box>

      <Stack p={4} gap={1}>
        {navItems.map((item, idx) => (
          <Button
            key={idx}
            variant={item.active ? 'solid' : 'ghost'}
            colorPalette={item.active ? 'indigo' : undefined}
            justifyContent="start"
            size="md"
            borderRadius="lg"
            _hover={item.active ? { bg: 'primary.bg' } : { bg: 'gray.50' }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>

      <Box mt="auto" pt={6} borderTop="1px" borderColor="gray.100" p={4}>
        <Text fontWeight="bold" fontSize="sm">Мария</Text>
        <Text color="gray.500" fontSize="xs">mail@gmail.com</Text>
      </Box>
    </Box>
  );
};