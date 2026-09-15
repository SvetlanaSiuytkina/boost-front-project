import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AchievementsList } from '../components/AchievementsList';
import { CreateAchievementModal } from '../components/CreateAchievementModal';
import type { Achievement } from '../types/achievements';

export const BoostPage = () => {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (newData: Omit<Achievement, 'id'>) => {
    await new Promise((r) => setTimeout(r, 300));
    
    const newItem: Achievement = {
      ...newData,
      id: Date.now().toString(),
      status: 'active',
    };

    setAchievements((prev) => {
      if (!prev) return [newItem];
      return [...prev, newItem];
    });

    setIsCreateModalOpen(false);
  };

  const handleIssue = (id: string | number) => {
    console.log('Выдать ачивку:', id);
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      setError(null);
      try {
        // TODO: когда бэкенд будет готов
        // const res = await fetch('/api/achievements');
        // if (!res.ok) throw new Error('Не удалось загрузить ачивки');
        // const data = await res.json();
        // setAchievements(data);

        // Заглушка: пустой массив
        setAchievements([]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Ошибка загрузки данных';
        setError(msg);
        setAchievements([]);
      }
    };

    fetchAchievements();
  }, []);

  // Состояние загрузки
  if (achievements === null) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="80vh">
        <Stack textAlign="center">
          <Heading size="lg">Добро пожаловать в Boost</Heading>
          <Text color="gray.500" mb={6}>
            Здесь хранятся шаблоны достижений
          </Text>
          <Text color="gray.400" fontSize="sm">
            Загрузка данных…
          </Text>
        </Stack>
      </Box>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <Box p={8} pt={20}>
        <Stack gap={6} mb={8}>
          <Box>
            <Heading size="xl" color="gray.900">
              Ачивки
            </Heading>
            <Text color="gray.500">
              Шаблоны достижений и ручная выдача сотрудникам
            </Text>
          </Box>
        </Stack>
        <Box
          bg="red.50"
          border="1px"
          borderColor="red.200"
          color="red.700"
          p={6}
          borderRadius="lg"
        >
          <Text fontWeight="semibold">Произошла ошибка при загрузке данных</Text>
          <Text mt={1}>{error}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={8} pt={20}>
      <Stack gap={6} mb={8}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Heading size="xl" color="gray.900">
              Ачивки
            </Heading>
            <Text color="gray.500">
              Шаблоны достижений и ручная выдача сотрудникам
            </Text>
          </Box>
          <Button
            colorPalette="indigo"
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Создать ачивку
          </Button>
        </Box>

        <Box
          bg="white"
          border="1px"
          borderColor="gray.200"
          p={4}
          borderRadius="lg"
          display="flex"
          gap={4}
          flexWrap="wrap"
        >
          <Box flex="1" minWidth="200px">
            <Text fontSize="sm" color="gray.500">Поиск по названию</Text>
          </Box>
          <Box minWidth="150px">
            <Text fontSize="sm" color="gray.500">Статус</Text>
          </Box>
        </Box>

        <AchievementsList
          achievements={achievements}
          onIssue={handleIssue}
        />
      </Stack>

      <CreateAchievementModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreate}
      />
    </Box>
  );
};