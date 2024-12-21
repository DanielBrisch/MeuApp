import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { ChatListScreenProps } from '../navigation/types';
import { getChats } from '../services/chatStorage';

const ChatListScreen: React.FC<ChatListScreenProps> = () => {
    // Estado para armazenar os chats
    const [chats, setChats] = useState<
      { id: string; question: string; response: string }[]
    >([]);
  
    // Controle da navegação
    const navigation = useNavigation<ChatListScreenProps['navigation']>();
  
    // Função para buscar os chats do AsyncStorage
    const fetchChats = async () => {
      const storedChats = await getChats(); // Busca os chats salvos
      setChats(storedChats); // Atualiza o estado
    };
  
    // Atualiza a lista de chats toda vez que a tela é exibida
    useFocusEffect(
      useCallback(() => {
        fetchChats();
      }, [])
    );
  
    // Renderiza um chat na lista
    const renderChat = ({ item }: { item: { id: string; question: string; response: string } }) => (
      <TouchableOpacity
        style={styles.chatItem}
        // Navega para a tela de detalhes passando pergunta e resposta
        onPress={() =>
          navigation.navigate('ChatDetalhes', { question: item.question, response: item.response })
        }
      >
        <Text style={styles.chatTitle}>{item.question}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seus Últimos Chats</Text>
        {/* Lista os chats usando FlatList */}
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id} // Define a chave única para cada item
          renderItem={renderChat} // Renderiza cada chat
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum chat disponível</Text> // Mostra mensagem se a lista estiver vazia
          }
        />
        {/* Botão flutuante para ir para a tela de fazer perguntas */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AskAI')}
        >
          <Icon name="chat" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };
  
  // Estilos da tela
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Fundo branco e espaçamento
    title: { fontSize: 20, marginBottom: 20 }, // Título da tela
    chatItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd', // Divisória entre itens
    },
    chatTitle: { fontSize: 16 }, // Texto do título do chat
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#aaa' }, // Texto vazio
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#6200ee', // Botão flutuante roxo
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Sombra no botão
    },
  });
  
  export default ChatListScreen;
  