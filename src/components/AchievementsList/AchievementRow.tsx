import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';
import { StatusBadge, MoreGorlIcon } from '../Utils';

interface AchievementRowProps {
  achievement: Achievement;
  onIssue: (achievement: Achievement) => void;
}

export const AchievementRow = ({ achievement, onIssue }: AchievementRowProps) => {
  const defaultIcon = '/icons/medals/default.svg';
  const iconSrc = achievement.icon || defaultIcon;

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
      {/* 1. Иконка */}
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

      {/* 2. Название */}
      <Box flex="1" minW="0">
        <Text
          fontWeight="bold"
          color="primary.text"
          fontSize="md"
          lineHeight="1.4"
        >
          {achievement.name}
        </Text>
      </Box>

      {/* 3. Описание */}
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

      {/* 4. Статус */}
      <Box w="120px" textAlign="center">
        <StatusBadge status={achievement.status} />
      </Box>

      {/* 5. Действия */}
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