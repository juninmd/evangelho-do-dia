import { Gospel, LiturgicalColor } from '../types/gospel';

const CURATED_GOSPELS: Record<string, Omit<Gospel, 'id' | 'date' | 'formattedDate'>> = {
  // Mateus 5: Bem-aventuranças
  beatitudes: {
    liturgicalSeason: '22ª Semana do Tempo Comum',
    liturgicalColor: 'verde',
    liturgicalColorLabel: 'Tempo Comum - Esperança e Fidelidade',
    cycle: 'Ano B / Par',
    title: 'As Bem-Aventuranças do Reino',
    reference: 'São Mateus 5, 1-12',
    keyVerse: 'Alegrai-vos e exultai, porque será grande a vossa recompensa nos céus.',
    text: `Naquele tempo, vendo Jesus as multidões, subiu ao monte. Sentou-se e seus discípulos aproximaram-se dele. Então começou a ensiná-los, dizendo:

"Felizes os pobres em espírito, porque deles é o Reino dos Céus.
Felizes os que choram, porque serão consolados.
Felizes os mansos, porque receberão a terra em herança.
Felizes os que têm fome e sede de justiça, porque serão saciados.
Felizes os misericordiosos, porque alcançarão misericórdia.
Felizes os puros de coração, porque verão a Deus.
Felizes os que promovem a paz, porque serão chamados filhos de Deus.
Felizes os que são perseguidos por causa da justiça, porque deles é o Reino dos Céus.

Felizes sois vós, quando vos insultarem e perseguirem, e, mentindo, disserem todo o mal contra vós por causa de mim. Alegrai-vos e exultai, porque será grande a vossa recompensa nos céus."`,
    reflection: `As Bem-Aventuranças representam a magna carta do Reino de Deus e o retrato vivo do próprio Cristo. Ao inverter a lógica dos padrões mundanos de poder, autossuficiência e glória terrena, Jesus nos revela onde reside a verdadeira plenitude: no coração humilde que confia unicamente na graça divina.

Ser manso, buscar a justiça com fome espiritual e construir ativamente a paz são atitudes que desafiam nossa inclinação ao egoísmo. Jesus não promete a ausência de provações, mas assegura a certeza consoladora de que cada lágrima e cada ato de misericórdia encontram acolhida eterna no abraço do Pai.`,
    prayer: `Senhor Jesus, manso e humilde de coração, molda a minha alma segundo o Evangelho das Bem-Aventuranças. Livra-me do apego às vaidades passageiras e concede-me um espírito desprendido, capaz de acolher a dor alheia com compaixão e semear a reconciliação em meio às divisões. Que a minha alegria brote sempre da certeza do Teu infinito amor. Amém.`,
    dailyResolution: `Praticar um gesto concreto de misericórdia e perdão hoje: acolher pacientemente alguém difícil ou oferecer uma palavra de consolo a quem está desanimado.`,
    source: 'Liturgia Diária - CNBB / Canção Nova',
    readingTimeMinutes: 3,
  },

  // João 15: Mandamento do Amor
  love: {
    liturgicalSeason: '22ª Semana do Tempo Comum',
    liturgicalColor: 'verde',
    liturgicalColorLabel: 'Tempo Comum - Vivência do Amor',
    cycle: 'Ano B / Par',
    title: 'Permanecei no Meu Amor',
    reference: 'São João 15, 9-17',
    keyVerse: 'Como o Pai me amou, assim também eu vos amei. Permanecei no meu amor.',
    text: `Naquele tempo, disse Jesus aos seus discípulos:

"Como o Pai me amou, assim também eu vos amei. Permanecei no meu amor. Se guardardes os meus mandamentos, permanecereis no meu amor, assim como eu guardei os mandamentos do meu Pai e permaneço no seu amor.

Eu vos disse isso para que a minha alegria esteja em vós e a vossa alegria seja plena. Este é o meu mandamento: amai-vos uns aos outros, assim como eu vos amei. Ninguém tem amor maior do que aquele que dá a vida por seus amigos.

Vós sois meus amigos, se fizerdes o que eu vos mando. Já não vos chamo servos, porque o servo não sabe o que faz o seu senhor. Eu vos chamo amigos, porque vos dei a conhecer tudo o que ouvi de meu Pai.

Não fostes vós que me escolhestes, mas fui eu que vos escolhi e vos destinei para irdes e dardes fruto, e para que o vosso fruto permaneça."`,
    reflection: `Jesus não nos impõe um amor baseado em esforço meramente humano; Ele nos oferece a fonte original: o mesmo amor com que o Pai o ama. Viver a amizade com Cristo transforma o cotidiano em oblação viva. Ele não nos quer escravos temerosos, mas amigos íntimos que compartilham os segredos do coração de Deus.`,
    prayer: `Divino Salvador, ensina-me a permanecer no Teu amor através das pequenas escolhas de hoje. Que a minha presença seja instrumento de serenidade e caridade fraterna, sem esperar nada em troca, amando com a gratuidade com que primeiro fui amado por Ti. Amém.`,
    dailyResolution: `Fazer uma oração silenciosa por alguém que me ofendeu ou com quem tenho dificuldade de convivência, escolhendo deliberadamente a bênção.`,
    source: 'Liturgia Diária - CNBB / Canção Nova',
    readingTimeMinutes: 3,
  },

  // Mateus 11: Vinde a Mim
  rest: {
    liturgicalSeason: '22ª Semana do Tempo Comum',
    liturgicalColor: 'verde',
    liturgicalColorLabel: 'Tempo Comum - Descanso no Senhor',
    cycle: 'Ano B / Par',
    title: 'O Alívio dos Cansados',
    reference: 'São Mateus 11, 28-30',
    keyVerse: 'Vinde a mim, todos vós que estais cansados e fatigados, e eu vos darei descanso.',
    text: `Naquele tempo, tomou Jesus a palavra e disse:

"Vinde a mim, todos vós que estais cansados e fatigados sob o peso dos vossos fardos, e eu vos darei descanso.

Tomai sobre vós o meu jugo e aprendei de mim, porque sou manso e humilde de coração, e vós encontrareis descanso para as vossas almas. Pois o meu jugo é suave e o meu fardo é leve."`,
    reflection: `Em meio à velocidade frenética e às ansiedades do mundo moderno, as palavras de Jesus ressoam como um santuário de paz inabalável. Ele não promete uma vida isenta de cruzes, mas promete carregar o fardo conosco. O Seu jugo não sufoca: ele liberta, porque é o jugo da mansidão e do amor gratuito.`,
    prayer: `Senhor, entrego diante de Ti os meus cansaços, preocupações e incertezas. Toma sobre Teus ombros santos o peso das minhas fragilidades. Ensina-me a descansar no Teu Sagrado Coração e a encontrar em Ti a verdadeira fonte de renovação e esperança. Amém.`,
    dailyResolution: `Reservar 5 minutos de puro silêncio interior durante a tarde para repousar na presença de Deus e renovar a serenidade.`,
    source: 'Liturgia Diária - CNBB / Canção Nova',
    readingTimeMinutes: 2,
  },
};

const formatLiturgicalDate = (date: Date): string => {
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capitalizedWeekday}, ${day} de ${month} de ${year}`;
};

export const getGospelByOffset = async (dayOffset = 0): Promise<Gospel> => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dayOffset);

  const dateStr = targetDate.toISOString().split('T')[0];
  const formattedDate = formatLiturgicalDate(targetDate);

  // Seleciona leitura litúrgica baseada no dia para manter variedade harmoniosa
  const dayOfYear = Math.floor(
    (targetDate.getTime() - new Date(targetDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  const keys = Object.keys(CURATED_GOSPELS);
  const chosenKey = keys[Math.abs(dayOfYear) % keys.length];
  const template = CURATED_GOSPELS[chosenKey];

  return {
    id: `gospel-${dateStr}`,
    date: dateStr,
    formattedDate,
    ...template,
  };
};

export const getGospelOfTheDay = async (): Promise<Gospel> => {
  return getGospelByOffset(0);
};

export default {
  getGospelOfTheDay,
  getGospelByOffset,
};
