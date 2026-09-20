import { useEffect, useState } from 'react';
import { MOCK_ACHIEVEMENTS } from '../mocks/achievements';
import type { Achievement } from '../types/achievements';

export type Notification = { type: 'success' | 'warning' | 'error'; message: string } | null;

export const useBoostPage = () => {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1100));
        setAchievements(MOCK_ACHIEVEMENTS);
        setHasAccess(true);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные');
        setHasAccess(false);
      }
    };

    loadData();
  }, );

  const handleCreate = async (newData: Omit<Achievement, 'id'>) => {
    await new Promise((r) => setTimeout(r, 300));
    const newItem: Achievement = {
      ...newData,
      id: Date.now().toString(),
      status: 'active',
    };
    setAchievements((prev) => (!prev ? [newItem] : [...prev, newItem]));
    
    setNotification({ type: 'success', message: 'Ачивка успешно создана' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleIssueSubmit = async (employeeId: string) => {
    await new Promise((r) => setTimeout(r, 500));

    const empName = MOCK_ACHIEVEMENTS.find((e) => e.id === employeeId)?.name || 'сотруднику';
    
    setNotification({
      type: 'success',
      message: `Ачивка выдана: ${empName}`,
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return {
    achievements,
    error,
    notification,
    isCreateModalOpen,
    handleCreate,
    handleIssueSubmit,
    setIsCreateModalOpen,
    hasAccess,
  };
};