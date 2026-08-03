export type Filter = 'all' | 'completed' | 'incomplete';

export const PRIORITY = [
  { id: 'all', label: 'Все', value: 'all' },
  { id: 'high', label: 'Высокй', value: 'high' },
  { id: 'medium', label: 'Средний', value: 'medium' },
  { id: 'low', label: 'Низкий', value: 'low' },
];
export const STATUS = [
  { id: 'all', label: 'Все', value: 'all' },
  { id: 'completed', label: 'Завершенные', value: 'completed' },
  { id: 'incomplete', label: 'Незавершенные', value: 'incomplete' },
];
