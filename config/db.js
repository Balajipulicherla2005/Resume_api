// import mysql from "mysql2";

// import dotenv from "dotenv";

// dotenv.config();

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
//       " ✅ MySQL Connected",
//     );
//   }
// });

// export default db;















import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 10568,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false,
  },

  connectTimeout: 30000,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
    process.exit(1);
  }

  console.log("✅ MySQL Connected Successfully");
});

export default db;
