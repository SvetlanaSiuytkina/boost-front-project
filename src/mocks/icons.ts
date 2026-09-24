export interface LibraryIcon {
  id: string;
  src: string;
  name: string;
}

export const LIBRARY_ICONS: LibraryIcon[] = [
  { id: 'ic-1',  src: 'icons/library/star.svg',        name: 'Звезда' },
  { id: 'ic-2',  src: 'icons/library/checkmark.svg',   name: 'Галочка' },
  { id: 'ic-3',  src: 'icons/library/check.svg',       name: 'Отметка' },
  { id: 'ic-4',  src: 'icons/library/flag.svg',        name: 'Флаг' },
  { id: 'ic-5',  src: 'icons/library/arrow.svg',       name: 'Стрелка' },
  { id: 'ic-6',  src: 'icons/library/time.svg',        name: 'Время' },
  { id: 'ic-7',  src: 'icons/library/form.svg',        name: 'Форма' },
  { id: 'ic-8',  src: 'icons/library/people.svg',      name: 'Люди' },
  { id: 'ic-9',  src: 'icons/library/person.svg',      name: 'Человек' },
  { id: 'ic-10', src: 'icons/library/triangle.svg',    name: 'Треугольник' },
];

export const COLOR_PALETTE: { id: string; value: string; label: string }[] = [
  { id: 'blue',   value: '#3B82F6', label: 'Синий' },
  { id: 'green',  value: '#10B981', label: 'Зелёный' },
  { id: 'purple', value: '#A855F7', label: 'Фиолетовый' },
  { id: 'orange', value: '#F97316', label: 'Оранжевый' },
  { id: 'yellow', value: '#EAB308', label: 'Жёлтый' },
  { id: 'red',    value: '#EF4444', label: 'Красный' },
  { id: 'lime',   value: '#84CC16', label: 'Лайм' },
  { id: 'gray',   value: '#6B7280', label: 'Серый' },
];