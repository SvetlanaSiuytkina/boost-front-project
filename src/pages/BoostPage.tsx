import { 
  Box, 
  Heading, 
  Text, 
  Stack, 
  Button, 
  Container, 
  AlertRoot, 
  AlertIndicator, 
  AlertContent, 
  AlertTitle, 
  AlertDescription 
} from '@chakra-ui/react';

import { useMemo, useState } from 'react';

import { Sidebar } from '../components/Sidebar';
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

  const [searchQuery, setSearchQuery] = useState('');

  const filteredAchievements = useMemo(() => {
    if (!achievements) return ; 
    
    if (!searchQuery) return achievements;
    
    const query = searchQuery.toLowerCase().trim();
    return achievements.filter(ach => 
      ach.name.toLowerCase().includes(query) || 
      (ach.description || '').toLowerCase().includes(query)
    );
  }, [achievements, searchQuery]);

  // Состояние загрузки
  if (achievements === null) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minH="100vh">
        <Stack textAlign="center">
          <Heading size="xl" color="primary.text" mb={2}>Добро пожаловать в Boost</Heading>
          <Text color="secondary.text" mb={6}>Здесь хранятся шаблоны достижений</Text>
          <Text color="border" fontSize="sm">Загрузка данных…</Text>
        </Stack>
      </Box>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <Box p={4} pt={16}>
        <Stack gap={6} mb={8}>
          <Box>
            <Heading size="xl" color="primary.text" mb={2}>Ачивки</Heading>
            <Text color="secondary.text" fontSize="md">
              Шаблоны достижений и ручная выдача сотрудникам
            </Text>
          </Box>
        </Stack>
        
        <AlertRoot status="error" variant="subtle">
          <AlertIndicator />
          <AlertContent>
            <AlertTitle>Произошла ошибка при загрузке данных</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </AlertContent>
        </AlertRoot>
      </Box>
    );
  }

  // Основной контент
  return (
    <Box color="primary.text" bg="background" minH="100vh" overflow="auto">
  
      <Sidebar />
      <Box ml="260px" pt={4} pb={8} width="calc(100% - 260px)">
        <Container maxWidth="container.xl" width="100%">
          <Stack gap={6} mb={8}>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="flex-end" 
              flexWrap="wrap" 
              gap={4}
            >
              <Box flex="1" minWidth="200px">
                <Heading size="4xl" as="h1" color="primary.text" lineHeight="1.1" mb={1}>
                  Ачивки
                </Heading>
                <Text color="secondary.text" fontSize="lg">
                  Шаблоны достижений и ручная выдача сотрудникам
                </Text>
              </Box>
              
              <Button 
                bg="primary.bg"
                color="primary.text"
                _hover={{ bg: 'primary.hover' }}
                size="lg" 
                onClick={() => setIsCreateModalOpen(true)}
                whiteSpace="nowrap"
              >
                + Создать ачивку
              </Button>
            </Box>

            {notification && (
              <AlertRoot 
                status={notification.type} 
                variant="solid" 
                borderRadius="md" 
                p={4} 
                mb={6}
              >
                <AlertIndicator />
                <AlertContent>
                  <AlertTitle fontWeight="medium">{notification.message}</AlertTitle>
                </AlertContent>
              </AlertRoot>
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
            
            <Box width="100%">
              <AchievementsList 
                achievements={filteredAchievements} 
                onIssue={handleIssue} 
                onSearchChange={setSearchQuery} 
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Модальные окна */}
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