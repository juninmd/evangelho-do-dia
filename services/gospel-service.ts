/**
 * Service to fetch the Gospel of the Day from Canção Nova website
 */

export interface Gospel {
  date: string;
  title: string;
  reference: string;
  text: string;
  reflection: string;
}

/**
 * Mock data for development and fallback
 */
const getMockGospel = (): Gospel => {
  const today = new Date();
  return {
    date: today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    title: 'Evangelho do Dia',
    reference: 'Mateus 5, 1-12',
    text: `Naquele tempo, vendo Jesus as multidões, subiu ao monte. Sentou-se e seus discípulos aproximaram-se dele. Então começou a ensiná-los, dizendo:

"Felizes os pobres em espírito, porque deles é o Reino dos Céus.
Felizes os que choram, porque serão consolados.
Felizes os mansos, porque receberão a terra em herança.
Felizes os que têm fome e sede de justiça, porque serão saciados.
Felizes os misericordiosos, porque alcançarão misericórdia.
Felizes os puros de coração, porque verão a Deus.
Felizes os que promovem a paz, porque serão chamados filhos de Deus.
Felizes os que são perseguidos por causa da justiça, porque deles é o Reino dos Céus.

Felizes sois vós, quando vos insultarem e perseguirem, e, mentindo, disserem todo o mal contra vós por causa de mim. Alegrai-vos e exultai, porque será grande a vossa recompensa nos céus."

Palavra da Salvação.`,
    reflection:
      'As bem-aventuranças são o caminho da verdadeira felicidade proposto por Jesus. Elas nos ensinam que a felicidade não está nas riquezas materiais, mas na confiança em Deus, na humildade, na justiça e no amor ao próximo.',
  };
};

/**
 * Fetch the Gospel of the Day from Canção Nova
 * Note: This is a simplified version. In production, you would need to:
 * 1. Use a proper web scraper (cheerio + axios for Node.js)
 * 2. Handle CORS issues (use a backend API)
 * 3. Parse the HTML structure of the website
 * 4. Handle errors and edge cases
 */
export const getGospelOfTheDay = async (): Promise<Gospel> => {
  try {
    // For React Native, you would typically call a backend API
    // that does the scraping, as direct web scraping in React Native
    // has limitations with CORS and HTML parsing

    // In this implementation, we're using mock data
    // In production, replace this with actual API call:
    // const response = await fetch('YOUR_BACKEND_API_URL/gospel');
    // const data = await response.json();
    // return data;

    return getMockGospel();
  } catch (error) {
    console.error('Error fetching gospel:', error);
    // Return mock data as fallback
    return getMockGospel();
  }
};

export default {
  getGospelOfTheDay,
};
