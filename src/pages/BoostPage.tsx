import { Box, Stack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AchievementsList } from '../components/AchievementsList/AchievementsList';
import { IssueAchievementPanel } from '../components/IssueAchievementPanel/IssueAchievementPanel';
import { MOCK_EMPLOYEES } from '../mocks/employees';
import { useBoostPage } from '../hooks/useBoostPage';
import type { Achievement } from '../types/achievements';
import { BoostHeader } from './BoostHeader';
import { BoostNotification } from './BoostNotification';
import { BoostIssueBanner } from './BoostIssueBanner';
import {
  LoadingState,
  EmptyState,
  ErrorState,
  NoAccessState,
} from '../components/BoostStates';

export const BoostPage = () => {
  const navigate = useNavigate();

  const {
    achievements,
    isLoading,
    error,
    notification,
    handleIssueSubmit,
    hasAccess,
    loadData,
  } = useBoostPage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isIssuePanelOpen, setIsIssuePanelOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = useMemo(() => {
    if (!achievements) return [];
    if (!searchQuery) return achievements;

    const query = searchQuery.toLowerCase().trim();
    return achievements.filter(
      (ach) =>
        ach.name.toLowerCase().includes(query) ||
        (ach.description || '').toLowerCase().includes(query)
    );
  }, [achievements, searchQuery]);

  const handleIssue = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsIssuePanelOpen(true);
  };

  const handleCreateClick = () => {
    navigate('/boost/create');
  };

  // --- Загрузка ---
  if (isLoading) {
    return (
      <Box color="primary.text" bg="background" minH="100vh">
        <Sidebar />
        <Box ml="260px" width="calc(100% - 260px)">
          <LoadingState />
        </Box>
      </Box>
    );
  }

  // --- Ошибка ---
  if (error) {
    return (
      <Box color="primary.text" bg="background" minH="100vh">
        <Sidebar />
        <Box ml="260px" width="calc(100% - 260px)" p={4} pt={8}>
          <BoostHeader
            title="Ачивки"
            subtitle="Шаблоны достижений и ручная выдача сотрудникам"
          />
          <Box mt={8}>
            <ErrorState message={error} onRetry={loadData} />
          </Box>
        </Box>
      </Box>
    );
  }

  // --- Нет прав ---
  if (hasAccess === false) {
    return (
      <Box color="primary.text" bg="background" minH="100vh">
        <Sidebar />
        <Box ml="260px" width="calc(100% - 260px)" p={4} pt={8}>
          <BoostHeader
            title="Ачивки"
            subtitle="У вас нет прав для просмотра этого раздела"
          />
          <Box mt={8}>
            <NoAccessState />
          </Box>
        </Box>
      </Box>
    );
  }

  // --- Основной рендер ---
  const isEmpty = achievements && achievements.length === 0;

  return (
    <Box color="primary.text" bg="background" minH="100vh" overflow="auto">
      <Sidebar />
      <Box ml="260px" pt={4} pb={8} width="calc(100% - 260px)">
        <Box maxWidth="container.xl" width="100%" mx="auto" px={4}>
          <Stack gap={6} mb={8}>
            <BoostHeader
              title="Ачивки"
              subtitle="Шаблоны достижений и ручная выдача сотрудникам"
              onCreate={handleCreateClick}
            />
            {notification && (
              <BoostNotification type={notification.type} message={notification.message} />
            )}
            {selectedAchievement && <BoostIssueBanner name={selectedAchievement.name} />}

            <Box width="100%">
              {isEmpty ? (
                <EmptyState onCreate={handleCreateClick} />
              ) : (
                <AchievementsList
                  achievements={filteredAchievements}
                  onIssue={handleIssue}
                  onSearchChange={setSearchQuery}
                  searchQuery={searchQuery}
                />
              )}
            </Box>
          </Stack>
        </Box>
      </Box>

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