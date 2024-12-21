import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../navigation/types';

const HomeScreen: React.FC = () => {
  // Controle de navegação
  const navigation = useNavigation<HomeScreenProps['navigation']>();

  return (
    <View style={styles.container}>
      {/* Texto de boas-vindas */}
      <Text style={styles.title}>Bem-vindo ao App de Receitas!</Text>
      {/* Texto adicional sobre o projeto */}
      <Text style={styles.title}>Projeto Final React Native UTFPR</Text>

      {/* Botão para ir para a lista de chats */}
      <View style={styles.buttonContainer}>
        <Button
          title="Ver Chats Recentes"
          onPress={() => navigation.navigate('ListaDeChats')}
        />
      </View>
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }, // Alinha o conteúdo ao centro
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }, // Estilo dos textos
  buttonContainer: {
    width: '80%', // Define a largura do botão
    marginTop: 20, // Espaçamento acima do botão
  },
});

export default HomeScreen;
