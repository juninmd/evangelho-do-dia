import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getGospelOfTheDay, type Gospel } from './services/gospel-service';

export default function App() {
  const [gospel, setGospel] = useState(null as Gospel | null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null as string | null);

  const loadGospel = async () => {
    try {
      setError(null);
      const data = await getGospelOfTheDay();
      setGospel(data);
    } catch (err) {
      setError('Erro ao carregar o evangelho. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGospel();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    void loadGospel();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#8B4513" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>📖 Evangelho do Dia</Text>
          <Text style={styles.date}>{gospel?.date ?? new Date().toLocaleDateString('pt-BR')}</Text>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => void loadGospel()}>
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {gospel?.title ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Título</Text>
                <Text style={styles.sectionContent}>{gospel.title}</Text>
              </View>
            ) : null}

            {gospel?.reference ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Referência</Text>
                <Text style={styles.sectionReference}>{gospel.reference}</Text>
              </View>
            ) : null}

            {gospel?.text ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Evangelho</Text>
                <Text style={styles.gospelText}>{gospel.text}</Text>
              </View>
            ) : null}

            {gospel?.reflection ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reflexão</Text>
                <Text style={styles.reflectionText}>{gospel.reflection}</Text>
              </View>
            ) : null}
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fonte: Canção Nova</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8B4513',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#D4A574',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#A0826D',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  sectionReference: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  gospelText: {
    fontSize: 17,
    color: '#2C2C2C',
    lineHeight: 28,
    textAlign: 'justify',
  },
  reflectionText: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 26,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  errorContainer: {
    backgroundColor: '#FFE4E1',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#D4A574',
  },
  footerText: {
    fontSize: 14,
    color: '#A0826D',
    fontStyle: 'italic',
  },
});
