import { Sequelize } from "sequelize";

import * as dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
  dialect: "mysql",
  host: process.env.HOST,
  port: +process.env.PORT_DB || 3306,
});

export { db };
