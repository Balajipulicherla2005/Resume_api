// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Gormi@123",
//   database: "AI_resume",
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("Database connection failed:", err);
//   } else {
//     console.log(" MySQL Connected");
//   }
// });

// module.exports = connection;


















// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(

//   process.env.DB_NAME,

//   process.env.DB_USER,

//   process.env.DB_PASSWORD,

//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );

// const connectDB = async () => {

//   try {

//     await sequelize.authenticate();

//     console.log("MySQL Connected");

//   } catch (error) {

//     console.log(error);
//   }
// };

// export {
//   sequelize,
//   connectDB,
// };












// require("dotenv").config();

// const mysql =
// require("mysql2");

// const db =
// mysql.createConnection({

//   host:
//   process.env.DB_HOST,

//   user:
//   process.env.DB_USER,

//   password:
//   process.env.DB_PASSWORD,

//   database:
//   process.env.DB_NAME,
// });

// db.connect((err) => {

//   if (err) {

//     console.log(

//       "Database Connection Failed",

//       err,
//     );

//   } else {

//     console.log(
//       "MySQL Connected",
//     );
//   }
// });

// module.exports = db;














import mysql from "mysql2";

import dotenv from "dotenv";

dotenv.config();

const db =
mysql.createConnection({

  host:
  process.env.DB_HOST,

  user:
  process.env.DB_USER,

  password:
  process.env.DB_PASSWORD,

  database:
  process.env.DB_NAME,
});

db.connect((err) => {

  if (err) {

    console.log(

      "Database Connection Failed",

      err,
    );

  } else {

    console.log(
      "MySQL Connected",
    );
  }
});

export default db;