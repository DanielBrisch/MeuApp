import axios from 'axios';
import 'dotenv/config';

const apiKey = process.env.API_KEY;

export const getRecipeSuggestions = async (ingredients: string[]) => {
    // Cria o prompt com os ingredientes fornecidos
    const prompt = `Sugira receitas criativas usando os seguintes ingredientes: ${ingredients.join(', ')}.`;
  
    try {
      // Faz a requisição para a API do OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4', // Define o modelo a ser usado
          messages: [{ role: 'user', content: prompt }], // Envia o prompt como mensagem do usuário
        },
        {
          headers: {
            'Content-Type': 'application/json', // Indica que o corpo da requisição é JSON
            Authorization: `Bearer ${apiKey}`, // Inclui a chave da API para autenticação
          },
        }
      );
  
      // Retorna o conteúdo da resposta gerada pela IA
      return response.data.choices[0].message.content;
    } catch (error) {
      // Exibe o erro no console se a requisição falhar
      console.error('Erro ao obter receitas:', error);
      throw error; // Relança o erro para ser tratado pelo chamador
    }
  };
  