import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColors } from '../theme';

interface Props {
  isPlaying: boolean;
  rate: number;
  theme: ThemeColors;
  onTogglePlay: () => void;
  onStop: () => void;
  onChangeRate: () => void;
}

export const AudioPlayerBar: React.FC<Props> = ({
  isPlaying,
  rate,
  theme,
  onTogglePlay,
  onStop,
  onChangeRate,
}) => {
  const bar1 = useRef(new Animated.Value(6)).current;
  const bar2 = useRef(new Animated.Value(14)).current;
  const bar3 = useRef(new Animated.Value(8)).current;
  const bar4 = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    let animLoop: Animated.CompositeAnimation | null = null;

    if (isPlaying) {
      animLoop = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(bar1, { toValue: 18, duration: 250, useNativeDriver: false }),
            Animated.timing(bar1, { toValue: 4, duration: 250, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(bar2, { toValue: 6, duration: 200, useNativeDriver: false }),
            Animated.timing(bar2, { toValue: 22, duration: 200, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(bar3, { toValue: 24, duration: 300, useNativeDriver: false }),
            Animated.timing(bar3, { toValue: 8, duration: 300, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(bar4, { toValue: 5, duration: 220, useNativeDriver: false }),
            Animated.timing(bar4, { toValue: 20, duration: 220, useNativeDriver: false }),
          ]),
        ])
      );
      animLoop.start();
    } else {
      Animated.parallel([
        Animated.timing(bar1, { toValue: 6, duration: 200, useNativeDriver: false }),
        Animated.timing(bar2, { toValue: 10, duration: 200, useNativeDriver: false }),
        Animated.timing(bar3, { toValue: 6, duration: 200, useNativeDriver: false }),
        Animated.timing(bar4, { toValue: 10, duration: 200, useNativeDriver: false }),
      ]).start();
    }

    return () => {
      animLoop?.stop();
    };
  }, [isPlaying, bar1, bar2, bar3, bar4]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.surfaceBorder,
          shadowColor: theme.isDark ? '#000' : theme.gold,
        },
      ]}
    >
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onTogglePlay} style={styles.playButtonWrapper} activeOpacity={0.8}>
          <LinearGradient
            colors={theme.goldGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playButton}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={18}
              color="#FFFFFF"
              style={isPlaying ? {} : { marginLeft: 2 }}
            />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.textDetails}>
          <Text style={[styles.playerTitle, { color: theme.textPrimary }]}>
            {isPlaying ? 'Ouvindo a Palavra' : 'Narração em Áudio'}
          </Text>
          <Text style={[styles.playerSubtitle, { color: theme.textSecondary }]}>
            {isPlaying ? 'Leitura reverente em andamento' : 'Toque para ouvir o Evangelho'}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {/* Animated sound wave bars */}
        <View style={styles.soundWaveWrapper}>
          <Animated.View style={[styles.waveBar, { height: bar1, backgroundColor: theme.gold }]} />
          <Animated.View style={[styles.waveBar, { height: bar2, backgroundColor: theme.gold }]} />
          <Animated.View style={[styles.waveBar, { height: bar3, backgroundColor: theme.gold }]} />
          <Animated.View style={[styles.waveBar, { height: bar4, backgroundColor: theme.gold }]} />
        </View>

        {/* Speed toggle */}
        <TouchableOpacity
          onPress={onChangeRate}
          style={[styles.chipButton, { backgroundColor: theme.surfaceVariant }]}
          accessibilityLabel="Alterar velocidade do áudio"
        >
          <Text style={[styles.chipText, { color: theme.textPrimary }]}>{rate}x</Text>
        </TouchableOpacity>

        {isPlaying && (
          <TouchableOpacity
            onPress={onStop}
            style={[styles.stopButton, { backgroundColor: theme.errorBackground }]}
            accessibilityLabel="Interromper áudio"
          >
            <Ionicons name="stop" size={14} color={theme.error} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  playButtonWrapper: {
    borderRadius: 22,
    shadowColor: '#C59A27',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDetails: {
    marginLeft: 12,
    flex: 1,
  },
  playerTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  playerSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  soundWaveWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    width: 28,
    justifyContent: 'space-between',
    marginRight: 4,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  chipButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  stopButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
