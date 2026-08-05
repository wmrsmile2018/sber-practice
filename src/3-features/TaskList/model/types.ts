export type Filter = 'all' | 'completed' | 'incomplete';
export type Priority = 'all' | 'high' | 'medium' | 'low';

export const PRIORITY: Array<{
  id: string;
  label: string;
  value: Priority;
}> = [
  { id: 'all', label: 'Все', value: 'all' },
  { id: 'high', label: 'Высокй', value: 'high' },
  { id: 'medium', label: 'Средний', value: 'medium' },
  { id: 'low', label: 'Низкий', value: 'low' },
];
export const STATUS: Array<{
  id: string;
  label: string;
  value: Filter;
}> = [
  { id: 'all', label: 'Все', value: 'all' },
  { id: 'completed', label: 'Завершенные', value: 'completed' },
  { id: 'incomplete', label: 'Незавершенные', value: 'incomplete' },
];
