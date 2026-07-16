// import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mysql",
//     logging: false,
//     define: {
//       underscored: true,
//       timestamps: true,
//     },
//   },
// );

// export const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("MySQL connection established.");
//   } catch (err) {
//     console.error("Unable to connect to the database:", err.message);
//     process.exit(1);
//   }
// };
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },

    define: {
      underscored: true,
      timestamps: true,
    },
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established.");
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
    process.exit(1);
  }
};