import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import AskAIScreen from './src/screens/AskIaScreen';
import { RootStackParamList } from './src/navigation/types';
import ChatDetailScreen from './src/screens/ChatDetailScreen';

// Importa o stack navigator do React Navigation
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      {/* Configura o stack navigator para as telas do app */}
      <Stack.Navigator initialRouteName="Home">
        {/* Tela inicial */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Tela com a lista de chats */}
        <Stack.Screen name="ListaDeChats" component={ChatListScreen} />
        {/* Tela para fazer perguntas à IA */}
        <Stack.Screen name="AskAI" component={AskAIScreen} />
        {/* Tela para mostrar os detalhes de um chat */}
        <Stack.Screen name="ChatDetalhes" component={ChatDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

