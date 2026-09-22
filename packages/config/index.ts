import dotenv from 'dotenv';
dotenv.config();
const environment = process.env.NODE_ENV || "development";
const config = {
  app: {
    environment,
    name: process.env.APP_NAME || "demo-app",
    port: Number(process.env.PORT || 3000),
    host: process.env.APP_HOST || "0.0.0.0",
  },
  mongo: {
    environment,
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/app",
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || "change_me",
  },
  cors: {
    // Comma-separated allowlist, e.g. CORS_ORIGIN=https://app.example.com,https://admin.example.com
    origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map((o) => o.trim()),
  },
};
export default config;
