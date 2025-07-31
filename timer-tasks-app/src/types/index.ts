export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimerSession {
  id: string;
  duration: number; // in seconds
  startTime: Date;
  endTime?: Date;
  taskId?: string; // optional link to a task
}

export interface AppState {
  tasks: Task[];
  timerSessions: TimerSession[];
}