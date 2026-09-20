import { Box, Text } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';
import { AchievementsSearch } from './AchievementsSearch';
import { AchievementsHeader } from './AchievementsHeader';
import { AchievementRow } from './AchievementRow';

interface AchievementsListProps {
  achievements: Achievement[] | null | undefined;
  onIssue: (achievement: Achievement) => void;
  onSearchChange?: (query: string) => void;
}

export const AchievementsList = ({ 
  achievements, 
  onIssue, 
  onSearchChange 
}: AchievementsListProps) => {
  if (!achievements || achievements.length === 0) {
    return (
      <Box p={8} textAlign="center" color="secondary.text">
        Список достижений пуст
      </Box>
    );
  }

  return (
    <Box bg="white" border="1px" borderColor="border" borderRadius="lg" boxShadow="sm" overflow="hidden">
      {/* --- HEADER (Поиск и фильтр) --- */}
      <Box 
        p={4} 
        bg="components.bg" 
        borderBottom="1px" 
        borderColor="border" 
        display="flex" 
        gap={4} 
        alignItems="center" 
      >
        <AchievementsSearch onSearchChange={onSearchChange} />
        <Text fontSize="xs" color="secondary.text" textTransform="uppercase">Статус</Text>
      </Box>
      {/* --- ЗАГОЛОВКИ КОЛОНОК --- */}
      <AchievementsHeader />
      {/* --- СПИСОК ЭЛЕМЕНТОВ --- */}
      <Box>
        {achievements.map((ach) => (
          <AchievementRow 
            key={ach.id} 
            achievement={ach} 
            onIssue={onIssue} 
          />
        ))}
      </Box>
    </Box>
  );
};