import type { Achievement } from '../types/achievements';

export const MOCK_ACHIEVEMENTS: Achievement[] = [
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
    icon: '/icons/medals/starting-sprint.svg' 
  },
];
