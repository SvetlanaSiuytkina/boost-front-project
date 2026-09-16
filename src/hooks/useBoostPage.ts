import { useEffect, useState } from 'react';
import { MOCK_ACHIEVEMENTS } from '../mocks/achievements';
import { MOCK_EMPLOYEES } from '../mocks/employees';
import type { Achievement } from '../types/achievements';

export type Notification = { type: 'success' | 'warning' | 'error'; message: string } | null;

export const useBoostPage = () => {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification>(null);

  const handleCreate = async (newData: Omit<Achievement, 'id'>) => {
    await new Promise((r) => setTimeout(r, 300));
    const newItem: Achievement = {
      ...newData,
      id: Date.now().toString(),
      status: 'active',
    };
    setAchievements((prev) => (!prev ? [newItem] : [...prev, newItem]));
    setIsCreateModalOpen(false);
  };

  const handleIssue = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsIssueModalOpen(true);
  };

  const handleIssueSubmit = async (employeeId: string) => {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const empName = MOCK_EMPLOYEES.find((e) => e.id === employeeId)?.name || 'сотруднику';
      setNotification({
        type: 'success',
        message: `Ачивка «${selectedAchievement?.name}» выдана: ${empName}`,
      });
      setTimeout(() => setNotification(null), 3000);
      setIsIssueModalOpen(false);
    } catch (e) {
      console.error(e);
      setNotification({ type: 'error', message: 'Не удалось выдать ачивку. Попробуйте позже.' });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      setError(null);
      try {
        setAchievements(MOCK_ACHIEVEMENTS);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Ошибка загрузки данных';
        setError(msg);
        setAchievements(null);
      }
    };
    fetchAchievements();
  }, []);

  return {
    achievements,
    error,
    notification,
    isCreateModalOpen,
    isIssueModalOpen,
    selectedAchievement,
    handleCreate,
    handleIssue,
    handleIssueSubmit,
    setIsCreateModalOpen,
    setIsIssueModalOpen,
  };
};