import dotenv from "dotenv";

dotenv.config();

/* ENV VARIABLES */
const APP_PORT = process.env.APP_PORT || 5001;
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

const DEBUG_MODE = process.env.DEBUG_MODE || "false";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const FORGET_PASSWORD_TOKEN_SECRET = process.env.FORGET_PASSWORD_TOKEN_SECRET;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
/* FOR EMAIL */
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const ADMIN_MAIL = process.env.ADMIN_MAIL;

export {
  APP_PORT,
  DEBUG_MODE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  FORGET_PASSWORD_TOKEN_SECRET,
  MONGO_DB_URI,
  SMTP_HOST,
  SMTP_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  ADMIN_MAIL,
  FRONTEND_BASE_URL,
};
