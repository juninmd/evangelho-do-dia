import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColors } from '../theme';
import { TabType } from '../types/gospel';

interface Props {
  theme: ThemeColors;
  currentTab: TabType;
  dayOffset: number;
  formattedDate: string;
  favoritesCount: number;
  onSelectTab: (tab: TabType) => void;
  onSelectDayOffset: (offset: number) => void;
  onToggleTheme: () => void;
  onOpenFontSize: () => void;
}

export const Header: React.FC<Props> = ({
  theme,
  currentTab,
  dayOffset,
  formattedDate,
  favoritesCount,
  onSelectTab,
  onSelectDayOffset,
  onToggleTheme,
  onOpenFontSize,
}) => {
  return (
    <View style={styles.container}>
      {/* Top sacred navbar */}
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <View style={[styles.crossBadge, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="sunny" size={20} color={theme.gold} />
          </View>
          <View>
            <Text style={[styles.appTitle, { color: theme.textPrimary }]}>Evangelho do Dia</Text>
            <Text style={[styles.appSubtitle, { color: theme.textGold }]}>{formattedDate}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={onOpenFontSize}
            style={[styles.headerBtn, { backgroundColor: theme.surfaceVariant }]}
            accessibilityLabel="Ajustar tamanho da fonte"
          >
            <Ionicons name="text" size={17} color={theme.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onToggleTheme}
            style={[styles.headerBtn, { backgroundColor: theme.surfaceVariant }]}
            accessibilityLabel={theme.isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            <Ionicons
              name={theme.isDark ? 'sunny-outline' : 'moon-outline'}
              size={17}
              color={theme.gold}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Day offset navigator (Ontem / Hoje / Amanhã) */}
      <View style={styles.daySelectorRow}>
        {[
          { label: 'Ontem', offset: -1 },
          { label: 'Hoje', offset: 0 },
          { label: 'Amanhã', offset: 1 },
        ].map((item) => {
          const isSelected = dayOffset === item.offset;
          return (
            <TouchableOpacity
              key={item.offset}
              onPress={() => onSelectDayOffset(item.offset)}
              style={[
                styles.dayPill,
                {
                  backgroundColor: isSelected ? theme.gold : theme.surfaceVariant,
                },
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dayPillText,
                  {
                    color: isSelected ? '#FFFFFF' : theme.textSecondary,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Tab Segmented Bar */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.surface,
            borderColor: theme.surfaceBorder,
          },
        ]}
      >
        {[
          { key: 'gospel' as TabType, label: 'Evangelho', icon: 'book-outline' },
          { key: 'reflection' as TabType, label: 'Meditação', icon: 'sparkles-outline' },
          { key: 'prayer' as TabType, label: 'Oração', icon: 'heart-outline' },
          {
            key: 'favorites' as TabType,
            label: 'Salvos',
            icon: 'bookmark-outline',
            badge: favoritesCount,
          },
        ].map((tab) => {
          const isActive = currentTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onSelectTab(tab.key)}
              style={[
                styles.tabItem,
                isActive && {
                  backgroundColor: theme.accentSoft,
                  borderBottomColor: theme.gold,
                  borderBottomWidth: 2,
                },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.tabIconWrapper}>
                <Ionicons
                  name={tab.icon as any}
                  size={16}
                  color={isActive ? theme.gold : theme.textMuted}
                />
                {tab.badge && tab.badge > 0 ? (
                  <View style={[styles.badgeCount, { backgroundColor: theme.gold }]}>
                    <Text style={styles.badgeCountText}>{tab.badge}</Text>
                  </View>
                ) : null}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? theme.textPrimary : theme.textMuted,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  crossBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
    fontFamily: 'serif',
  },
  appSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daySelectorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  dayPill: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
  },
  dayPillText: {
    fontSize: 13,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  tabIconWrapper: {
    position: 'relative',
  },
  badgeCount: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeCountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
