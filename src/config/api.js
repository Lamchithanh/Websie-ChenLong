const ENV = process.env.NODE_ENV || "development";

const CONFIG = {
  development: {
    API_URL: "http://localhost:5000/api",
  },
  production: {
    API_URL: "https://your-production-api.com/api",
  },
};

export const API_URL = CONFIG[ENV].API_URL;
