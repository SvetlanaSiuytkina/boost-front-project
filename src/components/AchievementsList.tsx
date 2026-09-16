import { Box, Grid, GridItem, Heading, Text, Button } from '@chakra-ui/react';
import type { Achievement } from '../types/achievements';

const StatusBadge = ({ status }: { status: Achievement['status'] }) => {
  let bgColor, textColor, label;
  
  switch (status) {
    case 'active':
      bgColor = 'green.50';
      textColor = 'green.700';
      label = 'Активна';
      break;
    case 'draft':
      bgColor = 'yellow.50';
      textColor = 'yellow.700';
      label = 'Черновик';
      break;
    case 'archived':
    default:
      bgColor = 'gray.50';
      textColor = 'gray.700';
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
      bg={bgColor}
      color={textColor}
      border={`1px solid ${textColor}`}
    >
      {label}
    </Box>
  );
};

const getIcon = (name?: string) => {
  if (!name) return '⭐';
  const n = name.toLowerCase();
  if (n.includes('первый')) return '🟢';
  if (n.includes('точно')) return '🔵';
  return '⭐';
};

interface AchievementsListProps {
  achievements: Achievement[];
  onIssue: (achievement: Achievement) => void;
}

export const AchievementsList = ({ achievements, onIssue }: AchievementsListProps) => {
  if (!achievements || achievements.length === 0) {
    return (
      <Box textAlign="center" py={10} color="gray.500">
        Список ачивок пуст. Создайте первую ачивку.
      </Box>
    );
  }

  return (
    <Box bg="white" border="1px" borderColor="gray.200" borderRadius="lg" boxShadow="sm" overflow="hidden">
      {/* Шапка таблицы */}
      <Grid
        templateColumns="repeat(5, 1fr)"
        bg="gray.50"
        borderBottom="1px"
        borderColor="gray.200"
        p={4}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
        color="gray.600"
      >
        <GridItem>Иконка</GridItem>
        <GridItem>Название</GridItem>
        <GridItem>Описание</GridItem>
        <GridItem textAlign="center">Статус</GridItem>
        <GridItem textAlign="right">Действия</GridItem>
      </Grid>

      {/* Строки таблицы */}
      <Box>
        {achievements.map((ach) => (
          <Grid
            templateColumns="repeat(5, 1fr)"
            key={ach.id}
            p={4}
            _hover={{ bg: 'gray.50' }}
            transition="background 0.2s"
            borderBottom="1px"
            borderColor="gray.100"
          >
            {/* Колонка 1: Иконка */}
            <GridItem display="flex" alignItems="center" justifyContent="center">
              <Box
                w="10"
                h="10"
                rounded="full"
                bg="white"
                border="1px"
                borderColor="gray.200"
                boxShadow="sm"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color={ach.iconColor}
              >
                {getIcon(ach.name)}
              </Box>
            </GridItem>

            {/* Колонка 2: Название */}
            <GridItem display="flex" alignItems="center">
              <Heading 
                size="sm" 
                color="gray.900" 
                fontWeight="semibold"
                lineHeight="1.3"
                w="100%"
              >
                {ach.name}
              </Heading>
            </GridItem>

            {/* Колонка 3: Описание */}
            <GridItem display="flex" alignItems="center">
              <Text 
                fontSize="sm" 
                color="gray.500" 
                maxWidth="240px"
                lineHeight="1.4"
              >
                {ach.description}
              </Text>
            </GridItem>

            {/* Колонка 4: Статус */}
            <GridItem display="flex" alignItems="center" justifyContent="center">
              <StatusBadge status={ach.status} />
            </GridItem>

            {/* Колонка 5: Действия */}
            <GridItem display="flex" alignItems="center" justifyContent="flex-end">
              <Button
                size="xs"
                colorPalette="indigo"
                onClick={() => onIssue(ach)}
                _hover={{ bg: 'indigo.50' }}
              >
                Выдать
              </Button>
            </GridItem>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};