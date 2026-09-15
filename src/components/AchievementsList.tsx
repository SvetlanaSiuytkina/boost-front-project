import { Box, Grid, GridItem, Heading, Text, Button } from '@chakra-ui/react';
import type { Achievement } from '../types/achievements';
import { BadgeStatus } from './BadgeStatus';

const getIcon = (title: string) => {
  if (title.includes('Первый')) return '🟢';
  if (title.includes('Точно')) return '🔵';
  if (title.includes('Командный')) return '🟣';
  if (title.includes('Знак')) return '🟠';
  if (title.includes('Генератор')) return '🟡';
  if (title.includes('Стартовый')) return '🔴';
  return '⭐';
};

interface AchievementsListProps {
  achievements: Achievement[] | null;
  onIssue: (id: string | number) => void;
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
      {/* Заголовок таблицы */}
      <Grid
        templateColumns="repeat(5, 1fr)"
        bg="gray.50"
        borderBottom="1px"
        borderColor="gray.200"
        p={4}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
        color="gray.500"
      >
        <GridItem>Изображение</GridItem>
        <GridItem>Название</GridItem>
        <GridItem>Описание</GridItem>
        <GridItem textAlign="center">Статус</GridItem>
        <GridItem textAlign="right">Действия</GridItem>
      </Grid>

      {/* Строки */}
      <Box>
        {achievements.map((ach) => (
          <Grid
            templateColumns="repeat(5, 1fr)"
            key={ach.id}
            p={4}
            _hover={{ bg: 'gray.50' }}
            transition="background 0.2s"
          >
            {/* Иконка */}
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
              >
                {getIcon(ach.title)}
              </Box>
            </GridItem>

            {/* Название */}
            <GridItem display="flex" alignItems="center">
              <Heading size="sm" color="gray.900" fontWeight="semibold">
                {ach.title}
              </Heading>
            </GridItem>

            {/* Описание */}
            <GridItem display="flex" alignItems="center">
              <Text fontSize="sm" color="gray.500" lineClamp="2" maxWidth="300px">
                {ach.description}
              </Text>
            </GridItem>

            {/* Статус */}
            <GridItem display="flex" alignItems="center" justifyContent="center">
              <BadgeStatus status={ach.status} />
            </GridItem>

            {/* Кнопка */}
            <GridItem display="flex" alignItems="center" justifyContent="flex-end">
              <Button size="xs" colorPalette="indigo" onClick={() => onIssue(ach.id)}>
                Выдать
              </Button>
            </GridItem>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};