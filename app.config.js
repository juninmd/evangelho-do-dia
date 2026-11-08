// Mantem app.json como fonte da verdade. A unica diferenca e opcional:
// EXPO_BASE_URL (ex.: /evangelho-do-dia) prefixa os assets do build web,
// usado pelo GitHub Pages em subpath. Sem a variavel, a config e identica.
module.exports = ({ config }) => {
  const baseUrl = process.env.EXPO_BASE_URL?.trim();
  if (!baseUrl) {
    return config;
  }
  return {
    ...config,
    experiments: { ...config.experiments, baseUrl },
  };
};
