import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TimerSession, AppState } from '../types';

const STORAGE_KEYS = {
  TASKS: '@timer_tasks_app:tasks',
  TIMER_SESSIONS: '@timer_tasks_app:timer_sessions',
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTimerSessions = async (): Promise<TimerSession[]> => {
  try {
    const sessionsJson = await AsyncStorage.getItem(STORAGE_KEYS.TIMER_SESSIONS);
    if (sessionsJson) {
      const sessions = JSON.parse(sessionsJson);
      // Convert date strings back to Date objects
      return sessions.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading timer sessions:', error);
    return [];
  }
};

export const saveTimerSessions = async (sessions: TimerSession[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving timer sessions:', error);
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.TASKS, STORAGE_KEYS.TIMER_SESSIONS]);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};