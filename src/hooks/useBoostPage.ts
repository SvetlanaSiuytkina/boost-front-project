import { useEffect, useState, useCallback } from 'react';
import { MOCK_ACHIEVEMENTS } from '../mocks/achievements';
import { MOCK_EMPLOYEES } from '../mocks/employees';
import type { Achievement, ValidationError } from '../types/achievements';

export type Notification = { type: 'success' | 'warning' | 'error'; message: string } | null;

export const useBoostPage = () => {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [notification, setNotification] = useState<Notification>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Загрузка данных
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      // Имитация проверки прав
      const userHasAccess = true; 
      if (!userHasAccess) {
        setHasAccess(false);
        return;
      }
      setHasAccess(true);
      // Имитация получения списка
      const data = MOCK_ACHIEVEMENTS.map(a => ({
        ...a,
        criterion: 'Выполнить 3 задачи',
        createdAt: new Date().toISOString(),
        author: 'Администратор',
        awardedCount: Math.floor(Math.random() * 10), // Случайный счетчик для примера
      }));
      setAchievements(data);
    } catch (err) {
      console.error(err);
      setError('Не удалось загрузить данные. Проверьте соединение.');
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

    useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((r) => setTimeout(r, 800));
        if (isCancelled) return;

        const userHasAccess = true;
        if (!userHasAccess) {
          setHasAccess(false);
          return;
        }
        setHasAccess(true);

        const data = MOCK_ACHIEVEMENTS.map((a) => ({
          ...a,
          criterion: 'Выполнить 3 задачи',
          createdAt: new Date().toISOString(),
          author: 'Администратор',
          awardedCount: Math.floor(Math.random() * 10),
        }));
        setAchievements(data);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        setError('Не удалось загрузить данные. Проверьте соединение.');
        setHasAccess(false);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Создание ачивки с валидацией и загрузкой иконки
  const handleCreate = async (draft: Omit<Achievement, 'id' | 'createdAt' | 'author' | 'awardedCount'>, iconFile?: File) => {
    // Валидация
    const errors: ValidationError[] = [];
    if (!draft.name.trim()) errors.push({ field: 'name', code: 'required', message: 'Название обязательно' });
    if (!draft.description.trim()) errors.push({ field: 'description', code: 'required', message: 'Описание обязательно' });
    
    if (errors.length > 0) {
      throw { validationErrors: errors };
    }

    // Проверка уникальности названия
    const isDuplicate = achievements?.some(a => a.name.toLowerCase() === draft.name.toLowerCase());
    if (isDuplicate) {
      throw { validationErrors: [{ field: 'name', code: 'duplicate', message: 'Ачивка с таким названием уже существует' }] };
    }

    // Имитация загрузки иконки
    let iconUrl = draft.icon;
    if (iconFile) {
      //здесь будет FormData и fetch
      await new Promise(r => setTimeout(r, 1000));
      iconUrl = URL.createObjectURL(iconFile); // Временная ссылка для демо
    }

    // Сохранение
    await new Promise((r) => setTimeout(r, 500));
    const newItem: Achievement = {
      ...draft,
      id: Date.now().toString(),
      status: 'active',
      iconColor: draft.iconColor || '#3B82F6',
      icon: iconUrl,
      createdAt: new Date().toISOString(),
      author: 'Текущий пользователь',
      awardedCount: 0,
    };

    setAchievements((prev) => (prev ? [newItem, ...prev] : [newItem]));
    setNotification({ type: 'success', message: 'Ачивка успешно создана' });
    setTimeout(() => setNotification(null), 3000);
  };

  // Выдача ачивки
  const handleIssueSubmit = async (employeeId: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const employee = MOCK_EMPLOYEES.find(e => e.id === employeeId);
    setNotification({
      type: 'success',
      message: `Ачивка выдана: ${employee?.name || 'сотруднику'}`,
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return {
    achievements,
    isLoading,
    error,
    notification,
    isCreateModalOpen,
    handleCreate,
    handleIssueSubmit,
    setIsCreateModalOpen,
    hasAccess,
    loadData
  };
};