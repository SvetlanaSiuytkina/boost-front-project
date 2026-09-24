import { Box, Text } from '@chakra-ui/react';

export const AchievementsHeader = () => {
  return (
    <Box
      px={4}
      py={2}
      bg="components.bg"
      borderBottom="1px"
      borderColor="border"
      display="flex"
      alignItems="center"
      gap={4}
    >
      <Box w="60px">
        <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          Изображение
        </Text>
      </Box>
      <Box flex="1" minW="0">
        <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          Название
        </Text>
      </Box>
      <Box flex="1" minW="0" maxW="300px">
        <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          Описание
        </Text>
      </Box>
      <Box w="80px" textAlign="center">
        <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          Выдано
        </Text>
      </Box>
      <Box w="120px" textAlign="center">
        <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          Статус
        </Text>
      </Box>
      <Box w="160px" textAlign="right">
        <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          Действия
        </Text>
      </Box>
    </Box>
  );
};