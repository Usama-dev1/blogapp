if (!import.meta.env.VITE_API_URL) {
  throw new Error("API_URL is not defined in the environment variables.");
}

const config = {
  API_URL: import.meta.env.VITE_API_URL,
};

export default config;
