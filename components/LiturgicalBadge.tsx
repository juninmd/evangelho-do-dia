import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';
import { Gospel } from '../types/gospel';

interface Props {
  gospel: Gospel;
  theme: ThemeColors;
}

export const LiturgicalBadge: React.FC<Props> = ({ gospel, theme }) => {
  const litColorInfo = theme.liturgical[gospel.liturgicalColor] || theme.liturgical.verde;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: litColorInfo.background,
            borderColor: litColorInfo.border,
          },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: litColorInfo.primary }]} />
        <Text style={[styles.badgeText, { color: litColorInfo.text }]}>
          {gospel.liturgicalSeason} • {gospel.cycle}
        </Text>
      </View>

      <View
        style={[
          styles.timeBadge,
          {
            backgroundColor: theme.surfaceVariant,
            borderColor: theme.surfaceBorder,
          },
        ]}
      >
        <Ionicons name="time-outline" size={13} color={theme.textMuted} style={styles.timeIcon} />
        <Text style={[styles.timeText, { color: theme.textSecondary }]}>
          {gospel.readingTimeMinutes} min
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  timeIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
