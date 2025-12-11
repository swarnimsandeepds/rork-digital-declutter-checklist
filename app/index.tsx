import { router } from 'expo-router';
import {
  Mail,
  Users,
  Smartphone,
  CreditCard,
  Folder,
  Globe,
  LucideIcon,
} from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDeclutter } from '@/app/providers/DeclutterProvider';
import { DECLUTTER_CATEGORIES } from '@/constants/declutterData';

const ICON_MAP: Record<string, LucideIcon> = {
  mail: Mail,
  users: Users,
  smartphone: Smartphone,
  'credit-card': CreditCard,
  folder: Folder,
  globe: Globe,
};

export default function HomeScreen() {
  const { getOverallProgress, getCategoryProgress, isLoading } = useDeclutter();
  const overall = getOverallProgress();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Digital Declutter</Text>
            <Text style={styles.subtitle}>
              Organize your digital life, one step at a time
            </Text>

            <View style={styles.overallProgressCard}>
              <View style={styles.overallProgressHeader}>
                <Text style={styles.overallProgressTitle}>Overall Progress</Text>
                <Text style={styles.overallProgressPercentage}>
                  {Math.round(overall.percentage)}%
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${overall.percentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.overallProgressSubtext}>
                {overall.completed} of {overall.total} tasks completed
              </Text>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            {DECLUTTER_CATEGORIES.map((category) => {
              const progress = getCategoryProgress(category.id);
              const IconComponent = ICON_MAP[category.icon];

              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push({
                      pathname: '/category',
                      params: { id: category.id },
                    });
                  }}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: category.color },
                    ]}
                  >
                    {IconComponent && (
                      <IconComponent size={24} color="#FFFFFF" strokeWidth={2} />
                    )}
                  </View>

                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <View style={styles.categoryProgressBar}>
                      <View
                        style={[
                          styles.categoryProgressFill,
                          {
                            width: `${progress.percentage}%`,
                            backgroundColor: category.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.categoryProgressText}>
                      {progress.completed} of {progress.total} tasks
                    </Text>
                  </View>

                  <View style={styles.categoryArrow}>
                    <Text style={styles.arrowText}>›</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#F5F3EE',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '700' as const,
    color: '#2D2D2D',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 28,
    lineHeight: 22,
  },
  overallProgressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overallProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallProgressTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#2D2D2D',
  },
  overallProgressPercentage: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#7FB685',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#F0EDE7',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7FB685',
    borderRadius: 6,
  },
  overallProgressSubtext: {
    fontSize: 14,
    color: '#8B8B8B',
    marginTop: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#2D2D2D',
    marginBottom: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#2D2D2D',
    marginBottom: 8,
  },
  categoryProgressBar: {
    height: 6,
    backgroundColor: '#F0EDE7',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryProgressText: {
    fontSize: 13,
    color: '#8B8B8B',
  },
  categoryArrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 28,
    color: '#CCCCCC',
    fontWeight: '300' as const,
  },
  bottomSpacer: {
    height: 20,
  },
});
