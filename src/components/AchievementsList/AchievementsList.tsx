// src/components/AchievementsList/AchievementsList.tsx
import { Box, Text, Stack } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';
import { AchievementsSearch } from './AchievementsSearch';
import { AchievementsHeader } from './AchievementsHeader';
import { AchievementRow } from './AchievementRow';
import { AchievementCard } from './AchievementCard';

interface AchievementsListProps {
  achievements: Achievement[] | null | undefined;
  onIssue: (achievement: Achievement) => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export const AchievementsList = ({
  achievements,
  onIssue,
  onSearchChange,
  searchQuery = '',
}: AchievementsListProps) => {
  if (!achievements || achievements.length === 0) {
    return (
      <Box p={8} textAlign="center" color="secondary.text">
        Список достижений пуст
      </Box>
    );
  }

  if (searchQuery && achievements.length === 0) {
    return (
      <Box p={8} textAlign="center" color="secondary.text">
        По запросу «{searchQuery}» ничего не найдено.
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      border="1px"
      borderColor="border"
      borderRadius="lg"
      boxShadow="sm"
      overflow="hidden"
    >
      {/* Поиск */}
      <Box
        p={{ base: 3, md: 4 }}
        bg="components.bg"
        borderBottom="1px"
        borderColor="border"
        display="flex"
        gap={4}
        alignItems="center"
        flexWrap="wrap"
      >
        <AchievementsSearch onSearchChange={onSearchChange} />
      </Box>

      {/* Десктоп: таблица */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <AchievementsHeader />
        {achievements.map((ach) => (
          <AchievementRow key={ach.id} achievement={ach} onIssue={onIssue} />
        ))}
      </Box>

      {/* Мобилка и планшет: карточки */}
      <Stack display={{ base: 'flex', lg: 'none' }} gap={0} p={0}>
        {achievements.map((ach) => (
          <AchievementCard key={ach.id} achievement={ach} onIssue={onIssue} />
        ))}
      </Stack>
    </Box>
  );
};