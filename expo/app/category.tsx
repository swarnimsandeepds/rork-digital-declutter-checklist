import { Stack, useLocalSearchParams } from 'expo-router';
import { Check } from 'lucide-react-native';
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { useDeclutter } from '@/app/providers/DeclutterProvider';
import { DECLUTTER_CATEGORIES, DeclutterTask } from '@/constants/declutterData';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completedTasks, toggleTask, getCategoryProgress } = useDeclutter();

  const category = DECLUTTER_CATEGORIES.find((c) => c.id === id);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  const progress = getCategoryProgress(category.id);

  return (
    <View style={styles.backgroundContainer}>
      <Stack.Screen
        options={{
          title: category.title,
          headerStyle: {
            backgroundColor: '#F5F3EE',
          },
          headerTintColor: '#2D2D2D',
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View
              style={[styles.categoryIcon, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryIconText}>
                {Math.round(progress.percentage)}%
              </Text>
            </View>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressSubtitle}>
                {progress.completed} of {progress.total} tasks completed
              </Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: `${progress.percentage}%`,
                  backgroundColor: category.color,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.tasksSection}>
          <Text style={styles.tasksTitle}>Tasks</Text>
          {category.tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              isCompleted={!!completedTasks[task.id]}
              onToggle={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                toggleTask(task.id);
              }}
              color={category.color}
              delay={index * 50}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

interface TaskItemProps {
  task: DeclutterTask;
  isCompleted: boolean;
  onToggle: () => void;
  color: string;
  delay: number;
}

function TaskItem({ task, isCompleted, onToggle, color, delay }: TaskItemProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(isCompleted ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, fadeAnim, scaleAnim]);

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: isCompleted ? 1 : 0,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [isCompleted, checkScale]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle();
  };

  return (
    <Animated.View
      style={[
        styles.taskItemContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              scale: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.taskItem, isCompleted && styles.taskItemCompleted]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <TouchableOpacity
          style={[
            styles.checkbox,
            isCompleted && [styles.checkboxCompleted, { backgroundColor: color }],
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Animated.View
            style={{
              transform: [{ scale: checkScale }],
            }}
          >
            {isCompleted && <Check size={18} color="#FFFFFF" strokeWidth={3} />}
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text
            style={[styles.taskTitle, isCompleted && styles.taskTitleCompleted]}
          >
            {task.title}
          </Text>
          <Text
            style={[
              styles.taskDescription,
              isCompleted && styles.taskDescriptionCompleted,
            ]}
          >
            {task.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#F5F3EE',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#8B8B8B',
  },
  progressSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  progressTextContainer: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 15,
    color: '#6B6B6B',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E8E5DD',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  tasksSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#2D2D2D',
    marginBottom: 16,
  },
  taskItemContainer: {
    marginBottom: 12,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  taskItemCompleted: {
    backgroundColor: '#FAFAF8',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1CFC7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  checkboxCompleted: {
    borderColor: 'transparent',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 22,
  },
  taskTitleCompleted: {
    color: '#9B9B9B',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  taskDescriptionCompleted: {
    color: '#ABABAB',
  },
  bottomSpacer: {
    height: 20,
  },
});
