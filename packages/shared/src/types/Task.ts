/* istanbul ignore file */
import { TaskStatus } from './TaskStatus';
import { StateObject } from './StateObject';

export interface Task extends StateObject {
  title: string;
  status: TaskStatus | keyof typeof TaskStatus;
  rating?: number | null;
  content?: string | null;
  author?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
