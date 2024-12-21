import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Define o tipo da rota para pegar os parâmetros da navegação
type ChatDetailRouteProp = RouteProp<RootStackParamList, 'ChatDetalhes'>;

const ChatDetailScreen: React.FC = () => {
  // Pega os parâmetros enviados pela rota (pergunta e resposta)
  const route = useRoute<ChatDetailRouteProp>();
  const { question, response } = route.params;

  return (
    // ScrollView para permitir rolar o conteúdo, caso a resposta seja longa
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhe do Chat</Text>
      <Text style={styles.label}>Pergunta:</Text>
      <Text style={styles.content}>{question}</Text>
      <Text style={styles.label}>Resposta:</Text>
      <Text style={styles.content}>{response}</Text>
    </ScrollView>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' }, // Espaçamento e fundo branco
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }, // Título grande e destacado
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 }, // Label para "Pergunta" e "Resposta"
  content: { fontSize: 16, marginTop: 10, lineHeight: 22, color: '#333' }, // Texto principal com espaçamento
});

export default ChatDetailScreen;
