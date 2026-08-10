export interface TTask {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}
