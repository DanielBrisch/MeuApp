import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getRecipeSuggestions } from '../services/recipeService';
import { saveChat } from '../services/chatStorage';

const AskAIScreen: React.FC = () => {
    // Estado para armazenar o texto digitado pelo usuário
    const [input, setInput] = useState('');
    // Estado para armazenar a resposta da API
    const [response, setResponse] = useState<string | null>(null);
    // Estado para indicar se a API está processando
    const [loading, setLoading] = useState(false);
  
    // Função chamada quando o usuário clica no botão "Buscar Receitas"
    const handleAskAI = async () => {
      setLoading(true); // Ativa o indicador de carregamento
      setResponse(null); // Limpa a resposta anterior
      try {
        // Envia os ingredientes para a API e obtém sugestões
        const suggestions = await getRecipeSuggestions(
          input.split(',').map((item) => item.trim()) // Divide os ingredientes por vírgula
        );
        setResponse(suggestions); // Salva a resposta
        await saveChat(input, suggestions); // Armazena o chat no banco local
      } catch (error) {
        setResponse('Erro ao buscar sugestões. Tente novamente.'); // Mostra uma mensagem de erro
      } finally {
        setLoading(false); // Desativa o indicador de carregamento
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Qual os ingredientes de hoje?</Text>
  
        {/* Campo de entrada para digitar os ingredientes */}
        <TextInput
          style={styles.input}
          placeholder="Digite os ingredientes (ex: tomate, frango, alho)"
          value={input}
          onChangeText={setInput}
        />
  
        {/* Botão para enviar a pergunta */}
        <Button
          title="Buscar Receitas"
          onPress={handleAskAI}
          disabled={loading || input.trim() === ''} // Desabilita se estiver carregando ou se o campo estiver vazio
        />
  
        {/* Indicador de carregamento */}
        {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}
  
        {/* Exibe a resposta da API */}
        {response && (
          <ScrollView style={styles.responseContainer}>
            <Text style={styles.responseText}>{response}</Text>
          </ScrollView>
        )}
      </View>
    );
  };
  
  // Estilos da tela
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Fundo branco e espaçamento
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }, // Título
    input: {
      borderWidth: 1,
      borderColor: '#ddd', // Campo com borda cinza
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    loader: { marginTop: 20 }, // Espaçamento para o indicador de carregamento
    responseContainer: { marginTop: 20 }, // Margem superior para o conteúdo
    responseText: { fontSize: 16, lineHeight: 22, textAlign: 'justify' }, // Texto justificado e legível
  });
  
  export default AskAIScreen;
  