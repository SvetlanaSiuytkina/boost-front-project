type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
};

export const navItems: NavItem[] = [
  { label: 'Главная', icon: 'icons/main/home.svg', active: false },
  { label: 'Аналитика', icon: 'icons/main/pie-chart.svg', active: false },
  { label: 'Орг. структура', icon: 'icons/main/case.svg', active: false },
  { label: 'Сотрудники', icon: 'icons/main/users.svg', active: false },
  { label: 'Boost', icon: 'icons/main/star.svg', active: true },
  { label: 'Опросы', icon: 'icons/main/question.svg', active: false },
  { label: 'Поиск', icon: 'icons/main/leading.svg', active: false },
  { label: 'Справка', icon: 'icons/main/about.svg', active: false },
];

export const footerItems: NavItem[] = [
  { label: 'Уведомления', icon: 'icons/main/bell.svg' },
  { label: 'Настройки', icon: 'icons/main/settings.svg' },
];