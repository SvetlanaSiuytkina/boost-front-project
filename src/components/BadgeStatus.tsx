import { Badge } from '@chakra-ui/react';
import type { AchievementStatus } from '../types/achievements';

interface BadgeStatusProps {
  status: AchievementStatus;
}

export const BadgeStatus = ({ status }: BadgeStatusProps) => {
  const colorPalette = status === 'active' ? 'green' : 'yellow';
  const label = status === 'active' ? 'Активна' : 'Черновик';

  return (
    <Badge colorPalette={colorPalette} textTransform="uppercase" fontSize="xs" px={2} py={1}>
      {label}
    </Badge>
  );
};