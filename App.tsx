import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme, ThemeColors } from './theme';
import { FavoriteItem, FontSizeLevel, Gospel, TabType } from './types/gospel';
import { getGospelByOffset } from './services/gospel-service';
import { StorageService } from './services/storage-service';
import { SpeechService } from './services/speech-service';

import { Header } from './components/Header';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { ReadingView } from './components/ReadingView';
import { ReflectionView } from './components/ReflectionView';
import { PrayerPurposeView } from './components/PrayerPurposeView';
import { FavoritesView } from './components/FavoritesView';
import { FontSizeModal } from './components/FontSizeModal';
import { Toast } from './components/Toast';

export default function App() {
  // State
  const [gospel, setGospel] = useState<Gospel | null>(null);
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // User preferences & navigation
  const [isDark, setIsDark] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<FontSizeLevel>('medium');
  const [showFontSizeModal, setShowFontSizeModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabType>('gospel');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isResolutionDone, setIsResolutionDone] = useState<boolean>(false);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioRate, setAudioRate] = useState<number>(1.0);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const theme: ThemeColors = isDark ? darkTheme : lightTheme;

  // Carregar preferências iniciais
  useEffect(() => {
    const initPrefs = async () => {
      const savedTheme = await StorageService.getThemeMode();
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      }
      const savedFontSize = await StorageService.getFontSize();
      setFontSize(savedFontSize);

      const savedFavorites = await StorageService.getFavorites();
      setFavorites(savedFavorites);
    };
    initPrefs();
  }, []);

  // Carregar o evangelho quando mudar o dia
  const loadGospel = async (offset = dayOffset) => {
    try {
      setError(null);
      // Para o áudio se mudar de dia
      if (isPlayingAudio) {
        await SpeechService.stop();
        setIsPlayingAudio(false);
      }

      const data = await getGospelByOffset(offset);
      setGospel(data);

      const done = await StorageService.isResolutionDone(data.date);
      setIsResolutionDone(done);
    } catch (err) {
      console.error('Erro ao carregar Evangelho:', err);
      setError('Não foi possível carregar a liturgia. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGospel(dayOffset);
  }, [dayOffset]);

  const onRefresh = () => {
    setRefreshing(true);
    loadGospel(dayOffset);
  };

  const handleToggleTheme = async () => {
    const nextMode = !isDark;
    setIsDark(nextMode);
    await StorageService.setThemeMode(nextMode ? 'dark' : 'light');
  };

  const handleSelectFontSize = async (size: FontSizeLevel) => {
    setFontSize(size);
    await StorageService.setFontSize(size);
  };

  const handleToggleFavorite = async () => {
    if (!gospel) return;
    const item: FavoriteItem = {
      id: gospel.id,
      date: gospel.date,
      formattedDate: gospel.formattedDate,
      title: gospel.title,
      reference: gospel.reference,
      keyVerse: gospel.keyVerse,
      snippet: gospel.text.slice(0, 120) + '...',
      savedAt: new Date().toISOString(),
    };

    const result = await StorageService.toggleFavorite(item);
    setFavorites(result.favorites);
    showToast(result.isFavorite ? 'Passagem guardada nos favoritos ⭐' : 'Removido dos favoritos');
  };

  const handleToggleResolution = async () => {
    if (!gospel) return;
    const nextVal = !isResolutionDone;
    setIsResolutionDone(nextVal);
    await StorageService.setResolutionDone(gospel.date, nextVal);
    showToast(
      nextVal
        ? 'Graças a Deus! Propósito cumprido hoje ✨'
        : 'Propósito desmarcado'
    );
  };

  // Áudio
  const handleToggleAudio = async () => {
    if (!gospel) return;

    if (isPlayingAudio) {
      await SpeechService.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      await SpeechService.speakGospel(
        gospel.text,
        gospel.reference,
        {
          onStart: () => setIsPlayingAudio(true),
          onDone: () => setIsPlayingAudio(false),
          onError: () => {
            setIsPlayingAudio(false);
            showToast('Aviso: Áudio indisponível neste navegador/dispositivo.');
          },
        },
        audioRate
      );
    }
  };

  const handleStopAudio = async () => {
    await SpeechService.stop();
    setIsPlayingAudio(false);
  };

  const handleChangeAudioRate = () => {
    const rates = [0.8, 1.0, 1.2];
    const nextIndex = (rates.indexOf(audioRate) + 1) % rates.length;
    const newRate = rates[nextIndex];
    setAudioRate(newRate);
    showToast(`Velocidade do áudio: ${newRate}x`);
  };

  // Compartilhamento & Cópia
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast(`${label} copiado para a área de transferência! 📋`);
      } else {
        // Em React Native mobile, o fallback é o diálogo de compartilhamento ou clipboard
        await Share.share({ message: text });
      }
    } catch {
      showToast('Copiado com sucesso!');
    }
  };

  const shareContent = async (title: string, message: string) => {
    try {
      await Share.share({
        title,
        message,
      });
    } catch (e) {
      console.warn('Erro ao compartilhar:', e);
    }
  };

  const handleCopyGospel = () => {
    if (!gospel) return;
    const text = `📖 *Evangelho do Dia - ${gospel.formattedDate}*\n_${gospel.reference}_\n\n${gospel.text}\n\n— Palavra da Salvação.\n— Glória a vós, Senhor.\n\nFonte: ${gospel.source}`;
    copyToClipboard(text, 'Evangelho');
  };

  const handleShareGospel = () => {
    if (!gospel) return;
    const text = `🕊️ *Evangelho do Dia*\n📅 ${gospel.formattedDate}\n📜 *${gospel.title}* (${gospel.reference})\n\n"${gospel.keyVerse}"\n\n${gospel.text}\n\n🙏 — Palavra da Salvação.\n— Glória a vós, Senhor.`;
    shareContent('Evangelho do Dia', text);
  };

  const handleCopyVerse = () => {
    if (!gospel) return;
    const text = `"${gospel.keyVerse}" — ${gospel.reference}`;
    copyToClipboard(text, 'Versículo');
  };

  const handleShareVerse = () => {
    if (!gospel) return;
    const text = `✨ *Versículo do Dia*\n\n"${gospel.keyVerse}"\n\n— ${gospel.reference}\n(Liturgia Diária)`;
    shareContent('Versículo do Dia', text);
  };

  const handleCopyReflection = () => {
    if (!gospel) return;
    copyToClipboard(`🕊️ *Reflexão - ${gospel.title}*\n\n${gospel.reflection}`, 'Reflexão');
  };

  const handleShareReflection = () => {
    if (!gospel) return;
    const text = `🕊️ *Reflexão do Evangelho*\n${gospel.reference}\n\n${gospel.reflection}\n\nOração: ${gospel.prayer}`;
    shareContent('Reflexão do Evangelho', text);
  };

  const handleCopyPrayer = () => {
    if (!gospel) return;
    copyToClipboard(`🕯️ *Oração do Dia*\n\n${gospel.prayer}`, 'Oração');
  };

  const handleSharePrayer = () => {
    if (!gospel) return;
    const text = `🕯️ *Oração do Dia*\n\n${gospel.prayer}\n\nPropósito: ${gospel.dailyResolution}`;
    shareContent('Oração do Dia', text);
  };

  const isCurrentGospelFavorite =
    !!gospel && favorites.some((f) => f.id === gospel.id || f.reference === gospel.reference);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.centerBox}>
          <View style={[styles.loadingHalo, { backgroundColor: theme.accentSoft }]}>
            <ActivityIndicator size="large" color={theme.gold} />
          </View>
          <Text style={[styles.loadingTitle, { color: theme.textPrimary }]}>Evangelho do Dia</Text>
          <Text style={[styles.loadingSubtitle, { color: theme.textSecondary }]}>
            Preparando a Palavra de Deus...
          </Text>
        </View>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.gold}
            colors={[theme.gold]}
          />
        }
      >
        <View style={styles.responsiveContainer}>
          {/* Sacred Navigation Header */}
          <Header
            theme={theme}
            currentTab={currentTab}
            dayOffset={dayOffset}
            formattedDate={gospel?.formattedDate ?? ''}
            favoritesCount={favorites.length}
            onSelectTab={setCurrentTab}
            onSelectDayOffset={setDayOffset}
            onToggleTheme={handleToggleTheme}
            onOpenFontSize={() => setShowFontSizeModal(true)}
          />

          {/* Audio Player bar (visible when on gospel tab or when playing) */}
          {(currentTab === 'gospel' || isPlayingAudio) && (
            <AudioPlayerBar
              isPlaying={isPlayingAudio}
              rate={audioRate}
              theme={theme}
              onTogglePlay={handleToggleAudio}
              onStop={handleStopAudio}
              onChangeRate={handleChangeAudioRate}
            />
          )}

          {/* Error State */}
          {error ? (
            <View
              style={[
                styles.errorCard,
                {
                  backgroundColor: theme.errorBackground,
                  borderColor: theme.error,
                },
              ]}
            >
              <Ionicons name="alert-circle-outline" size={32} color={theme.error} />
              <Text style={[styles.errorTitle, { color: theme.error }]}>Ops! Algo falhou</Text>
              <Text style={[styles.errorSubtitle, { color: theme.textSecondary }]}>{error}</Text>
              <TouchableOpacity
                onPress={() => loadGospel(dayOffset)}
                style={[styles.retryBtn, { backgroundColor: theme.gold }]}
              >
                <Text style={styles.retryBtnText}>Tentar Novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Tab Views */}
              {currentTab === 'gospel' && gospel && (
                <ReadingView
                  gospel={gospel}
                  theme={theme}
                  fontSize={fontSize}
                  isFavorite={isCurrentGospelFavorite}
                  isPlayingAudio={isPlayingAudio}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleAudio={handleToggleAudio}
                  onCopyGospel={handleCopyGospel}
                  onShareGospel={handleShareGospel}
                  onCopyVerse={handleCopyVerse}
                  onShareVerse={handleShareVerse}
                />
              )}

              {currentTab === 'reflection' && gospel && (
                <ReflectionView
                  gospel={gospel}
                  theme={theme}
                  onShareReflection={handleShareReflection}
                  onCopyReflection={handleCopyReflection}
                />
              )}

              {currentTab === 'prayer' && gospel && (
                <PrayerPurposeView
                  gospel={gospel}
                  theme={theme}
                  isResolutionDone={isResolutionDone}
                  onToggleResolution={handleToggleResolution}
                  onSharePrayer={handleSharePrayer}
                  onCopyPrayer={handleCopyPrayer}
                />
              )}

              {currentTab === 'favorites' && (
                <FavoritesView
                  favorites={favorites}
                  theme={theme}
                  onSelectFavorite={(item) => {
                    setCurrentTab('gospel');
                    showToast(`Visualizando ${item.reference}`);
                  }}
                  onRemoveFavorite={async (item) => {
                    const result = await StorageService.toggleFavorite(item);
                    setFavorites(result.favorites);
                    showToast('Passagem removida dos favoritos');
                  }}
                  onShareFavorite={(item) => {
                    const text = `⭐ *Passagem Favorita*\n${item.formattedDate}\n${item.title} (${item.reference})\n\n"${item.keyVerse}"`;
                    shareContent(item.title, text);
                  }}
                />
              )}
            </>
          )}

          {/* Footer Signature */}
          <View style={[styles.footer, { borderTopColor: theme.surfaceBorder }]}>
            <Ionicons name="sunny-outline" size={16} color={theme.gold} style={styles.footerIcon} />
            <Text style={[styles.footerSource, { color: theme.textMuted }]}>
              {gospel?.source ?? 'Liturgia Diária - CNBB / Canção Nova'}
            </Text>
            <Text style={[styles.footerMotto, { color: theme.textSecondary }]}>
              "Tua Palavra é lâmpada para os meus pés e luz para o meu caminho." (Salmo 119, 105)
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Font Size Selector Modal */}
      <FontSizeModal
        visible={showFontSizeModal}
        currentSize={fontSize}
        theme={theme}
        onSelect={handleSelectFontSize}
        onClose={() => setShowFontSizeModal(false)}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} theme={theme} onDismiss={() => setToastMessage(null)} />

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },
  responsiveContainer: {
    width: '100%',
    maxWidth: 680,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingHalo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'serif',
    marginBottom: 6,
  },
  loadingSubtitle: {
    fontSize: 14,
  },
  errorCard: {
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  errorSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },
  retryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    marginTop: 30,
    paddingTop: 24,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerIcon: {
    marginBottom: 6,
  },
  footerSource: {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 6,
  },
  footerMotto: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});
