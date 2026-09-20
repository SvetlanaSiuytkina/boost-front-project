import { Box, Text, Button, Flex, IconButton, Input, Image } from '@chakra-ui/react';
import type { Achievement } from '../types/achievements';

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { 
    id: '1', 
    name: 'Первый шаг', 
    description: 'Выдаётся за первое выполненное задание', 
    status: 'active', 
    iconColor: '#10B981', 
    icon: '/icons/medals/first.svg' 
  },
  { 
    id: '2', 
    name: 'Точно в срок', 
    description: 'Три задачи подряд сданы в срок', 
    status: 'active', 
    iconColor: '#3B82F6', 
    icon: '/icons/medals/exactly-time.svg' 
  },
  { 
    id: '3', 
    name: 'Командный игрок', 
    description: 'Подтверждённый вклад в результат команды', 
    status: 'active', 
    iconColor: '#8B5CF6', 
    icon: '/icons/medals/team-player.svg' 
  },
  { 
    id: '4', 
    name: 'Знак качества', 
    description: 'Работа принята без существенных доработок', 
    status: 'active', 
    iconColor: '#F59E0B', 
    icon: '/icons/medals/quality-mark.svg' 
  },
  { 
    id: '5', 
    name: 'Генератор идей', 
    description: 'Идея принята командой или куратором', 
    status: 'draft', 
    iconColor: '#14B8A6', 
    icon: '/icons/medals/idea-generator.svg' 
  },
  { 
    id: '6', 
    name: 'Стартовый рывок', 
    description: 'Быстрый старт в первую неделю', 
    status: 'draft', 
    iconColor: '#EF4444', 
    icon: '/icons/medals/start-rush.svg' 
  },
];

interface AchievementsListProps {
  achievements: Achievement[] | null | undefined;
  onIssue: (achievement: Achievement) => void;
  onSearchChange?: (query: string) => void;
}

const StatusBadge = ({ status }: { status: Achievement['status'] }) => {
  let bgToken, textToken, label;
  
  switch (status) {
    case 'active':
      bgToken = 'success.bg';
      textToken = 'success.text';
      label = 'Активна';
      break;
    case 'draft':
      bgToken = 'warning.bg';
      textToken = 'warning.text';
      label = 'Черновик';
      break;
    case 'archived':
    default:
      bgToken = 'components.bg';
      textToken = 'secondary.text';
      label = 'Архив';
  }

  return (
    <Box 
      px={3} py={1} 
      rounded="full" 
      fontSize="xs" 
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wide"
      bg={bgToken}
      color={textToken}
      border="1px"
      borderColor={textToken}
      lineHeight="1" 
    >
      {label}
    </Box>
  );
};

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MoreGorlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <circle cx="5" cy="12" r="1.5"></circle>
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="19" cy="12" r="1.5"></circle>
  </svg>
);

export const AchievementsList = ({ achievements, onIssue, onSearchChange }: AchievementsListProps) => {
  const data = (achievements && Array.isArray(achievements) ? achievements : MOCK_ACHIEVEMENTS);

  return (
    <Box bg="white" border="1px" borderColor="border" borderRadius="lg" boxShadow="sm" overflow="hidden">
      
      {/* --- HEADER (Поиск и фильтр) --- */}
      <Box p={4} bg="components.bg" borderBottom="1px" borderColor="border" display="flex" gap={4} alignItems="center">
        <Box flex="1" maxWidth="300px">
          <Flex alignItems="center" gap={2} w="100%">
            <Box color="secondary.text">
              <SearchIcon />
            </Box>
            <Input 
              placeholder="Поиск по названию..." 
              size="sm"
              flex="1"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </Flex>
        </Box>
        <Text fontSize="xs" color="secondary.text" textTransform="uppercase">Статус</Text>
      </Box>

      {/* --- ЗАГОЛОВКИ КОЛОНОК --- */}
      <Box 
        px={4} py={2} 
        bg="components.bg" 
        borderBottom="1px" 
        borderColor="border"
        display="flex" 
        alignItems="center" 
        gap={4}
      >
        <Box w="60px">
          <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Изображение</Text>
        </Box>
        <Box flex="1" minW="0">
          <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Название</Text>
        </Box>
        <Box flex="1" minW="0" maxW="300px">
          <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Описание</Text>
        </Box>
        <Box w="120px" textAlign="center">
          <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Статус</Text>
        </Box>
        <Box w="160px" textAlign="right">
          <Text color="secondary.text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Действия</Text>
        </Box>
      </Box>

      {/* --- СПИСОК ЭЛЕМЕНТОВ --- */}
      <Box>
        {data.map((ach: Achievement) => (
          <Box
            key={ach.id} 
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
                src={ach.icon || '/icons/medals/default.svg'} 
                alt={ach.name} 
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
                {ach.name}
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
              >
                {ach.description}
              </Box>
            </Box>

            {/* 4. Статус */}
            <Box w="120px" textAlign="center">
              <StatusBadge status={ach.status} />
            </Box>

            {/* 5. Действия */}
            <Box w="160px" textAlign="right">
              <Flex align="center" gap={2} justify="flex-end">
                <Button
                  size="xs"
                  bg="primary.bg"
                  color="primary.text"
                  _hover={{ bg: 'primary.hover' }}
                  onClick={() => onIssue(ach)}
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
                  onClick={() => console.log('Меню действий для:', ach.id)}
                >
                  <MoreGorlIcon />
                </IconButton>
              </Flex>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};