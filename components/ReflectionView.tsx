import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';
import { Gospel } from '../types/gospel';

interface Props {
  gospel: Gospel;
  theme: ThemeColors;
  onShareReflection: () => void;
  onCopyReflection: () => void;
}

export const ReflectionView: React.FC<Props> = ({
  gospel,
  theme,
  onShareReflection,
  onCopyReflection,
}) => {
  return (
    <View style={styles.container}>
      {/* Homily & Commentary Card */}
      <View
        style={[
          styles.reflectionCard,
          {
            backgroundColor: theme.surface,
            borderColor: theme.surfaceBorder,
            shadowColor: theme.isDark ? '#000' : theme.gold,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconWrapper, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="sunny-outline" size={20} color={theme.gold} />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={[styles.headerPretitle, { color: theme.gold }]}>HOMILÉTICA & VIDA</Text>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
              Reflexão do Evangelho
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />

        <Text style={[styles.reflectionBody, { color: theme.textPrimary }]}>
          {gospel.reflection}
        </Text>

        {/* Action Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={onCopyReflection}
            style={[styles.actionBtn, { backgroundColor: theme.surfaceVariant }]}
          >
            <Ionicons name="copy-outline" size={16} color={theme.textSecondary} />
            <Text style={[styles.actionBtnText, { color: theme.textSecondary }]}>Copiar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShareReflection}
            style={[styles.actionBtn, { backgroundColor: theme.surfaceVariant }]}
          >
            <Ionicons name="share-social-outline" size={16} color={theme.textSecondary} />
            <Text style={[styles.actionBtnText, { color: theme.textSecondary }]}>Partilhar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contemplation Prompt Box */}
      <View
        style={[
          styles.promptCard,
          {
            backgroundColor: theme.isDark ? '#1C1914' : '#FBF7ED',
            borderColor: theme.gold,
          },
        ]}
      >
        <View style={styles.promptHeader}>
          <Ionicons name="heart-outline" size={18} color={theme.gold} />
          <Text style={[styles.promptTitle, { color: theme.textGold }]}>
            MEDITAÇÃO DO CORAÇÃO
          </Text>
        </View>
        <Text style={[styles.promptText, { color: theme.textPrimary }]}>
          O que o Senhor está pedindo à sua vida através desta passagem hoje? Reserve um momento de silêncio e apresente suas intenções.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  reflectionCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTextCol: {
    flex: 1,
  },
  headerPretitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: 'serif',
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  reflectionBody: {
    fontSize: 17,
    lineHeight: 28,
    letterSpacing: 0.2,
    fontFamily: 'serif',
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  promptCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  promptTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  promptText: {
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
