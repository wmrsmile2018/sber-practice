export interface TTask {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
