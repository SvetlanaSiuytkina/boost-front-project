import { Box, Heading, Text, Button, Stack, AlertRoot, AlertIndicator, AlertContent, AlertTitle, AlertDescription } from '@chakra-ui/react';

export const LoadingState = () => (
  <Box display="flex" alignItems="center" justifyContent="center" minH="60vh" px={4}>
    <Stack textAlign="center" maxW="400px">
      <Heading fontSize={{ base: 'xl', md: '2xl' }} color="primary.text" mb={2}>
        Добро пожаловать в Boost
      </Heading>
      <Text color="secondary.text" mb={6} fontSize={{ base: 'sm', md: 'md' }}>
        Здесь хранятся шаблоны достижений
      </Text>
      <Text color="border" fontSize="sm">
        Загрузка данных…
      </Text>
    </Stack>
  </Box>
);

export const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <Box p={{ base: 6, md: 12 }} textAlign="center" bg="white" borderRadius="lg" border="1px" borderColor="border">
    <Heading fontSize={{ base: 'md', md: 'lg' }} color="primary.text" mb={2}>
      Пока нет ни одной ачивки
    </Heading>
    <Text color="secondary.text" mb={6} fontSize={{ base: 'sm', md: 'md' }}>
      Создайте первую ачивку, чтобы начать выдавать её сотрудникам.
    </Text>
    <Button colorPalette="blue" onClick={onCreate} width={{ base: '100%', sm: 'auto' }}>
      + Создать ачивку
    </Button>
  </Box>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <Box p={4}>
    <AlertRoot status="error" variant="subtle" borderRadius="md" p={{ base: 4, md: 6 }}>
      <AlertIndicator />
      <AlertContent>
        <AlertTitle fontWeight="bold" mb={2} color="red.500">
          Произошла ошибка при загрузке данных
        </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </AlertContent>
    </AlertRoot>
    <Button mt={4} colorPalette="blue" onClick={onRetry} width={{ base: '100%', sm: 'auto' }}>
      Попробовать снова
    </Button>
  </Box>
);

export const NoAccessState = () => (
  <Box p={4}>
    <AlertRoot status="warning" variant="subtle" borderRadius="md" p={{ base: 4, md: 6 }}>
      <AlertIndicator />
      <AlertContent>
        <AlertTitle fontWeight="bold" mb={2} color="orange.500">
          Нет прав доступа
        </AlertTitle>
        <AlertDescription>
          Обратитесь к администратору для получения доступа к модулю Boost
        </AlertDescription>
      </AlertContent>
    </AlertRoot>
  </Box>
);