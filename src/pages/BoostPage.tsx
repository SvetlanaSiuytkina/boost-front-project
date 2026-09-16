import { Box, Heading, Text, Stack, Button, Container } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/alert';
import { AchievementsList } from '../components/AchievementsList';
import { CreateAchievementModal } from '../components/CreateAchievementModal';
import { IssueAchievementModal } from '../components/IssueAchievementModal';
import { MOCK_EMPLOYEES } from '../mocks/employees';
import { useBoostPage } from '../hooks/useBoostPage';

export const BoostPage = () => {
  const {
    achievements,
    error,
    notification,
    isCreateModalOpen,
    isIssueModalOpen,
    selectedAchievement,
    handleCreate,
    handleIssue,
    handleIssueSubmit,
    setIsCreateModalOpen,
    setIsIssueModalOpen,
  } = useBoostPage();

  if (achievements === null) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minH="80vh">
        <Stack textAlign="center">
          <Heading size="xl" color="primary.text" mb={2}>Добро пожаловать в Boost</Heading>
          <Text color="secondary.text" mb={6}>Здесь хранятся шаблоны достижений</Text>
          <Text color="border" fontSize="sm">Загрузка данных…</Text>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} pt={16}>
        <Stack gap={6} mb={8}>
          <Box>
            <Heading size="xl" color="primary.text" mb={2}>Ачивки</Heading>
            <Text color="secondary.text" fontSize="md">Шаблоны достижений и ручная выдача сотрудникам</Text>
          </Box>
        </Stack>
        <Alert status="error" variant="subtle">
          <AlertIcon />
          <AlertTitle color="danger.text">Произошла ошибка при загрузке данных</AlertTitle>
          <AlertDescription color="secondary.text">{error}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box color="primary.text" bg="background" minH="100vh" overflow="auto">
      <Container maxWidth="container.xl" py={8} width="100%">
        <Stack gap={6} mb={8}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" gap={4}>
            <Box flex="1" minWidth="200px" order={1}>
              <Heading size="4xl" as="h1" color="primary.text" lineHeight="1.1" mb={1}>
                Ачивки
              </Heading>
              <Text color="secondary.text" fontSize="lg">
                Шаблоны достижений и ручная выдача сотрудникам
              </Text>
            </Box>
            
            <Button 
              colorPalette="primary" 
              size="lg" 
              onClick={() => setIsCreateModalOpen(true)}
              whiteSpace="nowrap"
              order={2}
            >
              + Создать ачивку
            </Button>
          </Box>

          {notification && (
            <Alert
              status={notification.type}
              variant="solid"
              borderRadius="md"
              p={4}
              mb={6}
              bg={
                notification.type === 'success' ? 'success.bg' :
                notification.type === 'warning' ? 'warning.bg' :
                'danger.bg'
              }
              color={
                notification.type === 'success' ? 'success.text' :
                notification.type === 'warning' ? 'warning.text' :
                'danger.text'
              }
            >
              <AlertIcon />
              <AlertTitle fontWeight="medium">{notification.message}</AlertTitle>
            </Alert>
          )}

          {selectedAchievement && (
            <Box
              bg="components.bg"
              border="1px"
              borderColor="border"
              p={4}
              borderRadius="md"
              display="flex"
              alignItems="center"
              gap={3}
              mb={6}
            >
              <Box w="4px" h="24px" bg="primary.text" borderRadius="full" />
              <Text fontSize="md" fontWeight="medium" color="primary.text">
                Выдача ачивки: «{selectedAchievement.name}»
              </Text>
            </Box>
          )}
          <Box
            bg="components.bg"
            border="1px"
            borderColor="border"
            p={4}
            borderRadius="lg"
            display="flex"
            gap={4}
            flexWrap="wrap"
          >
            <Box flex="1" minWidth="150px">
              <Text fontSize="xs" color="secondary.text" textTransform="uppercase" letterSpacing="0.05em">
                Поиск по названию
              </Text>
            </Box>
            <Box minWidth="120px">
              <Text fontSize="xs" color="secondary.text" textTransform="uppercase" letterSpacing="0.05em">
                Статус
              </Text>
            </Box>
          </Box>
          <Box width="100%">
            <AchievementsList achievements={achievements} onIssue={handleIssue} />
          </Box>
        </Stack>
      </Container>

      <CreateAchievementModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreate}
      />

      <IssueAchievementModal
        open={isIssueModalOpen}
        onOpenChange={setIsIssueModalOpen}
        onSubmit={handleIssueSubmit}
        employees={MOCK_EMPLOYEES}
        achievementName={selectedAchievement?.name || ''}
      />
    </Box>
  );
};