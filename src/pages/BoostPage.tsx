import { Box, Stack, Heading, Text, AlertRoot, AlertIndicator, AlertContent, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AchievementsList } from '../components/AchievementsList/AchievementsList';
import { CreateAchievementModal } from '../components/CreateAchievementModal/CreateAchievementModal';
import { IssueAchievementPanel } from '../components/IssueAchievementPanel/IssueAchievementPanel';
import { MOCK_EMPLOYEES } from '../mocks/employees';
import { MOCK_ACHIEVEMENTS } from '../mocks/achievements';
import { useBoostPage } from '../hooks/useBoostPage';
import type { Achievement } from '../types/achievements';
import { BoostHeader } from './BoostHeader';
import { BoostNotification } from './BoostNotification';
import { BoostIssueBanner } from './BoostIssueBanner';

export const BoostPage = () => {
  const {
    achievements,
    error,
    notification,
    isCreateModalOpen,
    handleCreate,
    handleIssueSubmit,
    setIsCreateModalOpen,
    hasAccess,
  } = useBoostPage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isIssuePanelOpen, setIsIssuePanelOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const displayAchievements = achievements ?? MOCK_ACHIEVEMENTS;

  const filteredAchievements = useMemo(() => {
    if (!displayAchievements) return [];
    if (!searchQuery) return displayAchievements;

    const query = searchQuery.toLowerCase().trim();
    return displayAchievements.filter(
      (ach) =>
        ach.name.toLowerCase().includes(query) ||
        (ach.description || '').toLowerCase().includes(query)
    );
  }, [displayAchievements, searchQuery]);

  const handleIssue = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsIssuePanelOpen(true);
  };
  // --- Загрузка ---
  if (achievements === null) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minH="100vh">
        <Stack textAlign="center">
          <Heading size="xl" color="primary.text" mb={2}>
            Добро пожаловать в Boost
          </Heading>
          <Text color="secondary.text" mb={6}>
            Здесь хранятся шаблоны достижений
          </Text>
          <Text color="border" fontSize="sm">
            Загрузка данных…
          </Text>
        </Stack>
      </Box>
    );
  }
  // --- Ошибка ---
  if (error) {
    return (
      <Box p={4} pt={16}>
        <BoostHeader title="Ачивки" subtitle="Шаблоны достижений и ручная выдача сотрудникам" />
        <Box mt={8}>
          <AlertRoot status="error" variant="subtle" borderRadius="md" p={6}>
            <AlertIndicator />
            <AlertContent>
              <AlertTitle fontWeight="bold" mb={2} color="red.500">
                Произошла ошибка при загрузке данных
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </AlertContent>
          </AlertRoot>
        </Box>
      </Box>
    );
  }
  // --- Нет прав ---
  if (hasAccess === false) {
    return (
      <Box p={4} pt={16}>
        <BoostHeader title="Ачивки" subtitle="У вас нет прав для просмотра этого раздела" />
        <Box mt={8}>
          <AlertRoot status="warning" variant="subtle" borderRadius="md" p={6}>
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
      </Box>
    );
  }
  // --- Основной рендер ---
  return (
    <Box color="primary.text" bg="background" minH="100vh" overflow="auto">
      <Sidebar />
      <Box ml="260px" pt={4} pb={8} width="calc(100% - 260px)">
        <Box maxWidth="container.xl" width="100%" mx="auto" px={4}>
          <Stack gap={6} mb={8}>
            <BoostHeader
              title="Ачивки"
              subtitle="Шаблоны достижений и ручная выдача сотрудникам"
              onCreate={() => setIsCreateModalOpen(true)}
            />
            {notification && (
              <BoostNotification type={notification.type} message={notification.message} />
            )}
            {selectedAchievement && <BoostIssueBanner name={selectedAchievement.name} />}
            <Box width="100%">
              <AchievementsList
                achievements={filteredAchievements}
                onIssue={handleIssue}
                onSearchChange={setSearchQuery}
              />
            </Box>
          </Stack>
        </Box>
      </Box>

      <CreateAchievementModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreate}
      />

      <IssueAchievementPanel
        open={isIssuePanelOpen}
        onOpenChange={setIsIssuePanelOpen}
        onSubmit={handleIssueSubmit}
        employees={MOCK_EMPLOYEES}
        achievementName={selectedAchievement?.name || ''}
      />
    </Box>
  );
};