import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { DECLUTTER_CATEGORIES } from '@/constants/declutterData';

const STORAGE_KEY = 'declutter_completed_tasks';

export type CompletedTasks = Record<string, boolean>;

export const [DeclutterProvider, useDeclutter] = createContextHook(() => {
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({});

  const loadQuery = useQuery({
    queryKey: ['declutter-tasks'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CompletedTasks) : {};
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (tasks: CompletedTasks) => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return tasks;
    },
  });

  useEffect(() => {
    if (loadQuery.data) {
      setCompletedTasks(loadQuery.data);
    }
  }, [loadQuery.data]);

  const toggleTask = (taskId: string) => {
    const updated = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId],
    };
    setCompletedTasks(updated);
    saveMutation.mutate(updated);
  };

  const getCategoryProgress = (categoryId: string) => {
    const category = DECLUTTER_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return { completed: 0, total: 0, percentage: 0 };

    const completed = category.tasks.filter(
      (task) => completedTasks[task.id]
    ).length;
    const total = category.tasks.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return { completed, total, percentage };
  };

  const getOverallProgress = () => {
    let totalTasks = 0;
    let completedCount = 0;

    DECLUTTER_CATEGORIES.forEach((category) => {
      category.tasks.forEach((task) => {
        totalTasks++;
        if (completedTasks[task.id]) {
          completedCount++;
        }
      });
    });

    const percentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
    return { completed: completedCount, total: totalTasks, percentage };
  };

  return {
    completedTasks,
    toggleTask,
    getCategoryProgress,
    getOverallProgress,
    isLoading: loadQuery.isLoading,
  };
});
