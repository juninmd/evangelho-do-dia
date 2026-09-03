import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../theme';
import { FontSizeLevel } from '../types/gospel';

interface Props {
  visible: boolean;
  currentSize: FontSizeLevel;
  theme: ThemeColors;
  onSelect: (size: FontSizeLevel) => void;
  onClose: () => void;
}

const OPTIONS: { level: FontSizeLevel; label: string; sizePx: number }[] = [
  { level: 'small', label: 'Compacto', sizePx: 15 },
  { level: 'medium', label: 'Padrão Nobre', sizePx: 18 },
  { level: 'large', label: 'Grande', sizePx: 21 },
  { level: 'xlarge', label: 'Leitura Ampliada', sizePx: 25 },
];

export const FontSizeModal: React.FC<Props> = ({
  visible,
  currentSize,
  theme,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder,
              shadowColor: theme.isDark ? '#000' : theme.gold,
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="text-outline" size={20} color={theme.gold} style={styles.icon} />
              <Text style={[styles.title, { color: theme.textPrimary }]}>Tamanho do Texto</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Ajuste a tipografia para o máximo conforto durante a oração e contemplação.
          </Text>

          <View style={styles.optionsList}>
            {OPTIONS.map((opt) => {
              const isSelected = currentSize === opt.level;
              return (
                <TouchableOpacity
                  key={opt.level}
                  onPress={() => onSelect(opt.level)}
                  style={[
                    styles.optionItem,
                    {
                      backgroundColor: isSelected ? theme.accentSoft : theme.surfaceVariant,
                      borderColor: isSelected ? theme.gold : theme.surfaceBorder,
                    },
                  ]}
                >
                  <View style={styles.optionLeft}>
                    <Text
                      style={[
                        styles.previewSample,
                        {
                          fontSize: opt.sizePx,
                          color: isSelected ? theme.textGold : theme.textPrimary,
                        },
                      ]}
                    >
                      Aa
                    </Text>
                    <Text
                      style={[
                        styles.optionLabel,
                        {
                          color: isSelected ? theme.textPrimary : theme.textSecondary,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {opt.label} ({opt.sizePx}px)
                    </Text>
                  </View>

                  {isSelected && <Ionicons name="checkmark-circle" size={20} color={theme.gold} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={onClose}
            style={[styles.doneButton, { backgroundColor: theme.gold }]}
          >
            <Text style={styles.doneButtonText}>Concluído</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  optionsList: {
    gap: 10,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewSample: {
    fontWeight: '700',
    width: 44,
    fontFamily: 'serif',
  },
  optionLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  doneButton: {
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
