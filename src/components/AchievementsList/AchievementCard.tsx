import { Box, Flex, Text, Button, Image, VStack } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';
import { StatusBadge } from '../Utils';

interface AchievementCardProps {
  achievement: Achievement;
  onIssue: (achievement: Achievement) => void;
}

const BASE_URL = import.meta.env.BASE_URL;

const resolveIconSrc = (src: string | undefined): string => {
  const fallback = 'icons/medals/default.svg';
  if (!src) return `${BASE_URL}${fallback}`;
  if (src.startsWith('blob:') || src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  const clean = src.startsWith('/') ? src.slice(1) : src;
  return `${BASE_URL}${clean}`;
};

export const AchievementCard = ({ achievement, onIssue }: AchievementCardProps) => {
  return (
    <Box
      p={4}
      borderBottom="1px"
      borderColor="border"
      _last={{ borderBottom: 'none' }}
      _hover={{ bg: 'components.bg' }}
    >
      <Flex align="flex-start" gap={3}>
        {/* Иконка */}
        <Box
          w="48px"
          h="48px"
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={resolveIconSrc(achievement.icon)}
            alt={achievement.name}
            w="36px"
            h="36px"
            objectFit="contain"
          />
        </Box>

        {/* Текст */}
        <VStack align="flex-start" gap={1} flex="1" minW="0">
          <Text fontWeight="bold" fontSize="md" color="primary.text">
            {achievement.name}
          </Text>
          <Text fontSize="sm" color="secondary.text">
            {achievement.description}
          </Text>
          <Box mt={1}>
            <StatusBadge status={achievement.status} />
          </Box>
        </VStack>
      </Flex>

      {/* Кнопка на всю ширину */}
      <Button
        mt={3}
        size="sm"
        width="100%"
        bg="primary.bg"
        color="primary.text"
        _hover={{ bg: 'primary.hover' }}
        onClick={() => onIssue(achievement)}
      >
        Выдать
      </Button>
    </Box>
  );
};