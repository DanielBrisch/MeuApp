import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ListaDeChats: undefined;
  AskAI: undefined;
  ChatDetalhes: { question: string; response: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ChatListScreenProps = NativeStackScreenProps<RootStackParamList, 'ListaDeChats'>;
