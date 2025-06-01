import dotenv from "dotenv";

dotenv.config();

export const corsConfig = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
};

export const backupPort = 4000;

export const jwtKey =
  process.env.JWT_SECRET ||
  "dev_fallback_71c2b94e8a1045d28c8a3d2c905fa7b34bde1e6c5f0f4993b02174c9f9e16a3f";
