import * as Speech from 'expo-speech';

export interface SpeechCallbacks {
  onStart?: () => void;
  onDone?: () => void;
  onError?: (error: unknown) => void;
}

export const SpeechService = {
  async speakGospel(text: string, reference: string, callbacks?: SpeechCallbacks, rate = 0.95): Promise<void> {
    try {
      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) {
        await Speech.stop();
      }

      const fullNarration = `Evangelho segundo ${reference}. ${text}. Palavra da Salvação. Glória a vós, Senhor.`;

      Speech.speak(fullNarration, {
        language: 'pt-BR',
        pitch: 1.0,
        rate,
        onStart: callbacks?.onStart,
        onDone: callbacks?.onDone,
        onError: callbacks?.onError,
      });
    } catch (err) {
      console.warn('Erro ao reproduzir áudio com expo-speech:', err);
      callbacks?.onError?.(err);
    }
  },

  async stop(): Promise<void> {
    try {
      await Speech.stop();
    } catch (e) {
      console.warn('Erro ao interromper áudio:', e);
    }
  },

  async isSpeaking(): Promise<boolean> {
    try {
      return await Speech.isSpeakingAsync();
    } catch {
      return false;
    }
  },
};
