import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';
import { FontSizeLevel, Gospel } from '../types/gospel';
import { LiturgicalBadge } from './LiturgicalBadge';
import { HeroQuoteCard } from './HeroQuoteCard';

interface Props {
  gospel: Gospel;
  theme: ThemeColors;
  fontSize: FontSizeLevel;
  isFavorite: boolean;
  isPlayingAudio: boolean;
  onToggleFavorite: () => void;
  onToggleAudio: () => void;
  onCopyGospel: () => void;
  onShareGospel: () => void;
  onCopyVerse: () => void;
  onShareVerse: () => void;
}

const FONT_SIZES: Record<FontSizeLevel, { text: number; lineHeight: number; dropCap: number }> = {
  small: { text: 15, lineHeight: 26, dropCap: 44 },
  medium: { text: 18, lineHeight: 30, dropCap: 52 },
  large: { text: 21, lineHeight: 36, dropCap: 60 },
  xlarge: { text: 25, lineHeight: 42, dropCap: 70 },
};

export const ReadingView: React.FC<Props> = ({
  gospel,
  theme,
  fontSize,
  isFavorite,
  isPlayingAudio,
  onToggleFavorite,
  onToggleAudio,
  onCopyGospel,
  onShareGospel,
  onCopyVerse,
  onShareVerse,
}) => {
  const [respondedAmen, setRespondedAmen] = useState(false);
  const typography = FONT_SIZES[fontSize];

  // Divide o texto em parágrafos e extrai a primeira letra para a capitular iluminada
  const paragraphs = gospel.text.split('\n\n').filter((p) => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || '';
  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <View style={styles.container}>
      {/* Liturgical Season & Duration */}
      <LiturgicalBadge gospel={gospel} theme={theme} />

      {/* Hero Quote of the Day */}
      <HeroQuoteCard
        quote={gospel.keyVerse}
        reference={gospel.reference}
        theme={theme}
        onCopy={onCopyVerse}
        onShare={onShareVerse}
      />

      {/* Main Scripture Card */}
      <View
        style={[
          styles.scriptureCard,
          {
            backgroundColor: theme.surface,
            borderColor: theme.surfaceBorder,
            shadowColor: theme.isDark ? '#000' : theme.gold,
          },
        ]}
      >
        {/* Sacred Header with Cross */}
        <View style={styles.cardHeader}>
          <View style={styles.crossAura}>
            <Ionicons name="book-outline" size={18} color={theme.gold} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.gospelTitle, { color: theme.textPrimary }]}>{gospel.title}</Text>
            <Text style={[styles.referenceBadge, { color: theme.gold }]}>{gospel.reference}</Text>
          </View>
        </View>

        <View style={[styles.sacredDivider, { backgroundColor: theme.surfaceBorder }]} />

        {/* Illuminated First Paragraph */}
        <View style={styles.textContainer}>
          <View style={styles.firstParagraphRow}>
            <View
              style={[
                styles.dropCapBox,
                {
                  backgroundColor: theme.accentSoft,
                  borderColor: theme.gold,
                },
              ]}
            >
              <Text style={[styles.dropCapText, { fontSize: typography.dropCap, color: theme.goldDark }]}>
                {firstLetter}
              </Text>
            </View>
            <Text
              style={[
                styles.gospelParagraph,
                {
                  fontSize: typography.text,
                  lineHeight: typography.lineHeight,
                  color: theme.textPrimary,
                  flex: 1,
                },
              ]}
            >
              {restOfFirstParagraph}
            </Text>
          </View>

          {/* Subsequent Scripture Paragraphs */}
          {remainingParagraphs.map((para, index) => (
            <Text
              key={index}
              style={[
                styles.gospelParagraph,
                styles.extraParagraph,
                {
                  fontSize: typography.text,
                  lineHeight: typography.lineHeight,
                  color: theme.textPrimary,
                },
              ]}
            >
              {para}
            </Text>
          ))}
        </View>

        {/* Liturgical Dialogue Banner */}
        <View
          style={[
            styles.dialogueBox,
            {
              backgroundColor: theme.surfaceVariant,
              borderColor: theme.surfaceBorder,
            },
          ]}
        >
          <Text style={[styles.dialoguePrompt, { color: theme.textMuted }]}>
            — Palavra da Salvação.
          </Text>

          <TouchableOpacity
            onPress={() => setRespondedAmen(!respondedAmen)}
            style={[
              styles.dialogueResponseBtn,
              {
                backgroundColor: respondedAmen ? theme.gold : theme.accentSoft,
                borderColor: theme.gold,
              },
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={respondedAmen ? 'checkmark-done-circle' : 'hand-right-outline'}
              size={18}
              color={respondedAmen ? '#FFFFFF' : theme.goldDark}
              style={styles.dialogueIcon}
            />
            <Text
              style={[
                styles.dialogueResponseText,
                { color: respondedAmen ? '#FFFFFF' : theme.textGold },
              ]}
            >
              {respondedAmen ? 'Glória a vós, Senhor! (Amém 🙏)' : '— Glória a vós, Senhor.'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scripture Actions Footer */}
        <View style={styles.actionToolbar}>
          <TouchableOpacity
            onPress={onToggleAudio}
            style={[
              styles.toolButton,
              {
                backgroundColor: isPlayingAudio ? theme.gold : theme.surfaceVariant,
              },
            ]}
            accessibilityLabel="Ouvir Evangelho"
          >
            <Ionicons
              name={isPlayingAudio ? 'volume-high' : 'volume-medium-outline'}
              size={18}
              color={isPlayingAudio ? '#FFFFFF' : theme.textPrimary}
            />
            <Text
              style={[
                styles.toolButtonText,
                { color: isPlayingAudio ? '#FFFFFF' : theme.textPrimary },
              ]}
            >
              {isPlayingAudio ? 'Ouvindo' : 'Ouvir'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onToggleFavorite}
            style={[
              styles.toolButton,
              {
                backgroundColor: isFavorite ? theme.accentSoft : theme.surfaceVariant,
                borderColor: isFavorite ? theme.gold : 'transparent',
                borderWidth: isFavorite ? 1 : 0,
              },
            ]}
            accessibilityLabel="Favoritar leitura"
          >
            <Ionicons
              name={isFavorite ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={isFavorite ? theme.gold : theme.textPrimary}
            />
            <Text
              style={[
                styles.toolButtonText,
                { color: isFavorite ? theme.gold : theme.textPrimary },
              ]}
            >
              {isFavorite ? 'Salvo' : 'Salvar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onCopyGospel}
            style={[styles.toolButton, { backgroundColor: theme.surfaceVariant }]}
            accessibilityLabel="Copiar Evangelho completo"
          >
            <Ionicons name="copy-outline" size={18} color={theme.textPrimary} />
            <Text style={[styles.toolButtonText, { color: theme.textPrimary }]}>Copiar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShareGospel}
            style={[styles.toolButton, { backgroundColor: theme.surfaceVariant }]}
            accessibilityLabel="Compartilhar Evangelho"
          >
            <Ionicons name="share-social-outline" size={18} color={theme.textPrimary} />
            <Text style={[styles.toolButtonText, { color: theme.textPrimary }]}>Partilhar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  scriptureCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  crossAura: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  gospelTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'serif',
  },
  referenceBadge: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  sacredDivider: {
    height: 1,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 24,
  },
  firstParagraphRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dropCapBox: {
    width: 48,
    height: 54,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  dropCapText: {
    fontWeight: '900',
    fontFamily: 'serif',
    lineHeight: 52,
  },
  gospelParagraph: {
    fontFamily: 'serif',
    letterSpacing: 0.25,
  },
  extraParagraph: {
    marginTop: 16,
  },
  dialogueBox: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  dialoguePrompt: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 10,
    fontWeight: '600',
  },
  dialogueResponseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  dialogueIcon: {
    marginRight: 6,
  },
  dialogueResponseText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  actionToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  toolButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 5,
  },
  toolButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
