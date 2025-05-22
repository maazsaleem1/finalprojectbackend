import { config } from "dotenv";

config();

export const {
    PORT,
    DB_URI,
    API_PREFIX,
    SALT,
    EXPIRES_IN,
    BEARER_TOKEN,
    JWT_SECRET, 

} = process.env;