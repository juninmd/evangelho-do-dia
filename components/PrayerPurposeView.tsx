import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';
import { Gospel } from '../types/gospel';

interface Props {
  gospel: Gospel;
  theme: ThemeColors;
  isResolutionDone: boolean;
  onToggleResolution: () => void;
  onSharePrayer: () => void;
  onCopyPrayer: () => void;
}

export const PrayerPurposeView: React.FC<Props> = ({
  gospel,
  theme,
  isResolutionDone,
  onToggleResolution,
  onSharePrayer,
  onCopyPrayer,
}) => {
  return (
    <View style={styles.container}>
      {/* Daily Prayer Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.surface,
            borderColor: theme.surfaceBorder,
            shadowColor: theme.isDark ? '#000' : theme.gold,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.iconBox, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="flame-outline" size={20} color={theme.gold} />
          </View>
          <View style={styles.headerCol}>
            <Text style={[styles.pretitle, { color: theme.gold }]}>COLÓQUIO ESPIRITUAL</Text>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Oração do Dia</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />

        <Text style={[styles.prayerText, { color: theme.textPrimary }]}>{gospel.prayer}</Text>

        <View style={styles.prayerActions}>
          <TouchableOpacity
            onPress={onCopyPrayer}
            style={[styles.btn, { backgroundColor: theme.surfaceVariant }]}
          >
            <Ionicons name="copy-outline" size={15} color={theme.textSecondary} />
            <Text style={[styles.btnText, { color: theme.textSecondary }]}>Copiar Oração</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSharePrayer}
            style={[styles.btn, { backgroundColor: theme.surfaceVariant }]}
          >
            <Ionicons name="share-social-outline" size={15} color={theme.textSecondary} />
            <Text style={[styles.btnText, { color: theme.textSecondary }]}>Partilhar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Practical Daily Purpose Card */}
      <View
        style={[
          styles.resolutionCard,
          {
            backgroundColor: isResolutionDone ? (theme.isDark ? '#14271B' : '#EBF7EE') : theme.surface,
            borderColor: isResolutionDone ? theme.success : theme.surfaceBorder,
          },
        ]}
      >
        <View style={styles.resHeader}>
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: isResolutionDone
                  ? theme.success
                  : theme.accentSoft,
              },
            ]}
          >
            <Ionicons
              name={isResolutionDone ? 'checkmark-done' : 'leaf-outline'}
              size={18}
              color={isResolutionDone ? '#FFFFFF' : theme.gold}
            />
          </View>
          <View style={styles.headerCol}>
            <Text
              style={[
                styles.pretitle,
                { color: isResolutionDone ? theme.success : theme.gold },
              ]}
            >
              GESTO DE CARIDADE
            </Text>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Propósito de Hoje</Text>
          </View>
        </View>

        <Text style={[styles.resolutionText, { color: theme.textPrimary }]}>
          {gospel.dailyResolution}
        </Text>

        <TouchableOpacity
          onPress={onToggleResolution}
          style={[
            styles.checkButton,
            {
              backgroundColor: isResolutionDone ? theme.success : theme.gold,
            },
          ]}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isResolutionDone ? 'checkmark-circle' : 'ellipse-outline'}
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.checkButtonText}>
            {isResolutionDone ? 'Cumprido com a graça de Deus! ✨' : 'Marcar como cumprido hoje'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerCol: {
    flex: 1,
  },
  pretitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: 'serif',
  },
  divider: {
    height: 1,
    marginBottom: 18,
  },
  prayerText: {
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'serif',
    fontStyle: 'italic',
    letterSpacing: 0.2,
    marginBottom: 20,
  },
  prayerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  resolutionCard: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
  },
  resHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  resolutionText: {
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 18,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
