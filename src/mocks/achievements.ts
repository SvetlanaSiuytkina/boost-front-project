import type { Achievement } from '../types/achievements';

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    name: 'Первый запуск',
    description: 'Запустил проект и увидел главную страницу',
    status: 'active',
    iconColor: '#4A88F0',
  },
  {
    id: '2',
    name: 'Точно в срок',
    description: 'Сдал задачу до дедлайна',
    status: 'draft',
    iconColor: '#F59E0B',
  },
];