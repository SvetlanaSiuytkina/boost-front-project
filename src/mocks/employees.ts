//предоставляет тестовых сотрудников, пока нет доступа к Sigma
export interface Employee {
  id: string;
  name: string;
  department?: string;
  avatar?: string;
}

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Мария Иванова', department: 'HR' },
  { id: 'emp-2', name: 'Алексей Петров', department: 'Разработка' },
  { id: 'emp-3', name: 'Елена Смирнова', department: 'Аналитика' },
  { id: 'emp-4', name: 'Дмитрий Волков', department: 'Маркетинг' },
];