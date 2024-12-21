import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'chat_history';

export const saveChat = async (question: string, response: string) => {
  try {
    const existingChats = await getChats();
    const newChat = { id: Date.now().toString(), question, response };
    const updatedChats = [...existingChats, newChat];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChats));
  } catch (error) {
    console.error('Erro ao salvar o chat:', error);
  }
};

// Função para obter todas as perguntas armazenadas
export const getChats = async (): Promise<{ id: string; question: string; response: string }[]> => {
  try {
    const chats = await AsyncStorage.getItem(STORAGE_KEY);
    return chats ? JSON.parse(chats) : [];
  } catch (error) {
    console.error('Erro ao obter os chats:', error);
    return [];
  }
};
