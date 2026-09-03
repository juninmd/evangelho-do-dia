import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';
import { FavoriteItem } from '../types/gospel';

interface Props {
  favorites: FavoriteItem[];
  theme: ThemeColors;
  onSelectFavorite: (item: FavoriteItem) => void;
  onRemoveFavorite: (item: FavoriteItem) => void;
  onShareFavorite: (item: FavoriteItem) => void;
}

export const FavoritesView: React.FC<Props> = ({
  favorites,
  theme,
  onSelectFavorite,
  onRemoveFavorite,
  onShareFavorite,
}) => {
  if (favorites.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
        <View style={[styles.emptyIconCircle, { backgroundColor: theme.accentSoft }]}>
          <Ionicons name="bookmark-outline" size={36} color={theme.gold} />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
          Nenhuma Passagem Salva
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Toque no botão "Salvar" durante a leitura do Evangelho para guardar suas passagens e meditações favoritas aqui.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerCount, { color: theme.textSecondary }]}>
        {favorites.length} {favorites.length === 1 ? 'passagem guardada' : 'passagens guardadas'} no seu coração
      </Text>

      {favorites.map((item) => (
        <View
          key={item.id}
          style={[
            styles.itemCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder,
              shadowColor: theme.isDark ? '#000' : theme.gold,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.cardMain}
            onPress={() => onSelectFavorite(item)}
            activeOpacity={0.7}
          >
            <View style={styles.cardTop}>
              <Text style={[styles.dateText, { color: theme.gold }]}>{item.formattedDate}</Text>
              <Text style={[styles.referenceText, { color: theme.textGold }]}>{item.reference}</Text>
            </View>

            <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>{item.title}</Text>

            {item.keyVerse ? (
              <Text style={[styles.snippet, { color: theme.textSecondary }]} numberOfLines={2}>
                "{item.keyVerse}"
              </Text>
            ) : null}
          </TouchableOpacity>

          <View style={[styles.cardDivider, { backgroundColor: theme.surfaceBorder }]} />

          <View style={styles.cardActions}>
            <TouchableOpacity
              onPress={() => onShareFavorite(item)}
              style={styles.actionBtn}
              accessibilityLabel="Partilhar passagem"
            >
              <Ionicons name="share-social-outline" size={16} color={theme.textSecondary} />
              <Text style={[styles.actionText, { color: theme.textSecondary }]}>Partilhar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onRemoveFavorite(item)}
              style={styles.actionBtn}
              accessibilityLabel="Remover dos favoritos"
            >
              <Ionicons name="trash-outline" size={16} color={theme.error} />
              <Text style={[styles.actionText, { color: theme.error }]}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  headerCount: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  emptyContainer: {
    borderRadius: 24,
    padding: 36,
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  itemCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardMain: {
    padding: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  referenceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  snippet: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  cardDivider: {
    height: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
