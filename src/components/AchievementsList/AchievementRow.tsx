import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';
import { StatusBadge, MoreGorlIcon } from '../Utils';

interface AchievementRowProps {
  achievement: Achievement;
  onIssue: (achievement: Achievement) => void;
}

const resolveIconSrc = (src: string | undefined): string => {
  const fallback = 'icons/medals/default.svg';
  if (!src) {
    return `${import.meta.env.BASE_URL}${fallback}`;
  }
  if (src.startsWith('blob:') || src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  const clean = src.startsWith('/') ? src.slice(1) : src;
  return `${import.meta.env.BASE_URL}${clean}`;
};

export const AchievementRow = ({ achievement, onIssue }: AchievementRowProps) => {
  const iconSrc = resolveIconSrc(achievement.icon);

  return (
    <Box
      key={achievement.id}
      display="flex"
      alignItems="center"
      gap={4}
      px={4}
      py={5}
      borderBottom="1px"
      borderColor="border"
      _hover={{ bg: 'components.bg' }}
      transition="background-color 0.2s"
    >
      <Box w="48px" h="48px" display="flex" alignItems="center" justifyContent="center">
        <Image
          src={iconSrc}
          alt={achievement.name}
          objectFit="contain"
          w="32px"
          h="32px"
          style={{ filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))` }}
        />
      </Box>

      <Box flex="1" minW="0">
        <Text fontWeight="bold" color="primary.text" fontSize="md" lineHeight="1.4">
          {achievement.name}
        </Text>
      </Box>

      <Box flex="1" minW="0" maxW="300px">
        <Box
          fontSize="sm"
          color="secondary.text"
          lineHeight="1.4"
          textOverflow="ellipsis"
          display="block"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {achievement.description}
        </Box>
      </Box>

      <Box w="120px" textAlign="center">
        <StatusBadge status={achievement.status} />
      </Box>

      <Box w="160px" textAlign="right">
        <Flex align="center" gap={2} justify="flex-end">
          <Button
            size="xs"
            bg="primary.bg"
            color="primary.text"
            _hover={{ bg: 'primary.hover' }}
            onClick={() => onIssue(achievement)}
            zIndex={1}
            minW="80px"
          >
            Выдать
          </Button>

          <IconButton
            variant="ghost"
            aria-label="Действия с ачивкой"
            color="secondary.text"
            _hover={{ color: 'primary.text' }}
            onClick={() => console.log('Меню действий для:', achievement.id)}
          >
            <MoreGorlIcon />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
};