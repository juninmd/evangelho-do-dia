import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';

interface Props {
  quote: string;
  reference: string;
  theme: ThemeColors;
  onCopy: () => void;
  onShare: () => void;
}

export const HeroQuoteCard: React.FC<Props> = ({ quote, reference, theme, onCopy, onShare }) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.surfaceBorder,
          shadowColor: theme.gold,
        },
      ]}
    >
      <LinearGradient
        colors={theme.isDark ? ['#211B10', '#131824'] : ['#FCF8ED', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.topHeader}>
          <View style={styles.badgeWrapper}>
            <LinearGradient
              colors={theme.goldGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.goldPill}
            >
              <Ionicons name="sparkles" size={11} color="#FFFFFF" style={styles.sparkleIcon} />
              <Text style={styles.goldPillText}>VERSÍCULO EM DESTAQUE</Text>
            </LinearGradient>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              onPress={onCopy}
              style={[styles.miniButton, { backgroundColor: theme.surfaceVariant }]}
              accessibilityLabel="Copiar versículo"
            >
              <Ionicons name="copy-outline" size={15} color={theme.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onShare}
              style={[styles.miniButton, { backgroundColor: theme.surfaceVariant }]}
              accessibilityLabel="Compartilhar versículo"
            >
              <Ionicons name="share-social-outline" size={15} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quoteWrapper}>
          <Text style={[styles.openQuote, { color: theme.gold }]}>“</Text>
          <Text style={[styles.quoteText, { color: theme.textPrimary }]}>{quote}</Text>
        </View>

        <View style={styles.footerRow}>
          <View style={[styles.goldDivider, { backgroundColor: theme.gold }]} />
          <Text style={[styles.referenceText, { color: theme.gold }]}>{reference}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  gradientCard: {
    padding: 20,
    borderRadius: 20,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeWrapper: {
    flexDirection: 'row',
  },
  goldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sparkleIcon: {
    marginRight: 4,
  },
  goldPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteWrapper: {
    position: 'relative',
    marginVertical: 4,
  },
  openQuote: {
    fontSize: 48,
    lineHeight: 48,
    position: 'absolute',
    top: -22,
    left: -4,
    opacity: 0.25,
    fontFamily: 'serif',
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  goldDivider: {
    width: 24,
    height: 2,
    borderRadius: 1,
    marginRight: 10,
  },
  referenceText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
