import { Box, Text, Button, Flex, IconButton, Input, Image } from '@chakra-ui/react';

import type { Achievement } from '../types/achievements';

interface AchievementsListProps {
  achievements: Achievement[] | null | undefined;
  onIssue: (achievement: Achievement) => void;
  onSearchChange?: (query: string) => void;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', name: 'Первый запуск', description: 'Запустил проект и увидел главную страницу', status: 'active', iconColor: '#4A88F0', icon: '/icons/medals/first.svg' },
  { id: '2', name: 'Точно в срок', description: 'Сдал задачу до дедлайна', status: 'draft', iconColor: '#F59E0B', icon: '/icons/medals/exactly-time.svg' },
  { id: '3', name: 'Командный игрок', description: 'Подтверждённый вклад в результат команды', status: 'active', iconColor: '#4A88F0', icon: '/icons/medals/team-player.svg' },
  { id: '4', name: 'Генератор идей', description: 'Идея принята командой или куратором', status: 'draft', iconColor: '#F59E0B', icon: '/icons/medals/idea-generator.svg' },
  { id: '5', name: 'Знак качества', description: 'Работа принята без существенных доработок', status: 'active', iconColor: '#4A88F0', icon: '/icons/medals/quality-mark.svg' },
];

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

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--chakra-colors-border)' }}>
            <th style={{ width: '60px', paddingLeft: '1rem', color: 'var(--chakra-colors-secondary-text)', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'left' }}>Изображение</th>
            <th style={{ paddingLeft: '1rem', color: 'var(--chakra-colors-secondary-text)', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'left' }}>Название</th>
            <th style={{ paddingLeft: '1rem', color: 'var(--chakra-colors-secondary-text)', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'left' }}>Описание</th>
            <th style={{ width: '120px', paddingLeft: '1rem', color: 'var(--chakra-colors-secondary-text)', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'center' }}>Статус</th>
            <th style={{ width: '160px', paddingLeft: '1rem', color: 'var(--chakra-colors-secondary-text)', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ach) => (
            <tr 
              key={ach.id} 
              style={{ 
                borderBottom: '1px solid var(--chakra-colors-border)',
                transition: 'background-color 0.2s',
                cursor: 'default'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--chakra-colors-components-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <td style={{ paddingLeft: '1rem', verticalAlign: 'middle' }}>
                <Box w="32px" h="32px" display="flex" alignItems="center" justifyContent="center">
                  <Image 
                    src={ach.icon || '/icons/medals/first.svg'} 
                    alt={ach.name} 
                    objectFit="contain" 
                    w="100%" 
                    h="100%" 
                  />
                </Box>
              </td>

              <td style={{ paddingLeft: '1rem', verticalAlign: 'middle' }}>
                <Text fontWeight="semibold" color="primary.text" lineHeight="1.3">
                  {ach.name}
                </Text>
              </td>

              <td style={{ paddingLeft: '1rem', verticalAlign: 'middle' }}>
                <Text fontSize="sm" color="secondary.text" maxWidth="240px" lineHeight="1.4">
                  {ach.description}
                </Text>
              </td>

              <td style={{ paddingLeft: '1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                <StatusBadge status={ach.status} />
              </td>

              <td style={{ paddingLeft: '1rem', verticalAlign: 'middle', textAlign: 'right' }}>
                <Flex align="center" gap={2} justify="flex-end">
                  <Button
                    size="xs"
                    bg="primary.bg"
                    color="primary.text"
                    _hover={{ bg: 'primary.hover' }}
                    onClick={() => onIssue(ach)}
                    zIndex={1}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};