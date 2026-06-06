// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });













// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");

// const db = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(express.json());


// // REGISTER API

// app.post("/register", async (req, res) => {

//   const { name, email, password } = req.body;

//   const hashedPassword =
//   await bcrypt.hash(password, 10);

//   const sql =
//   "INSERT INTO users(name,email,password) VALUES(?,?,?)";

//   db.query(
//       sql,
//       [name, email, hashedPassword],

//       (err, result) => {

//         if(err) {

//           res.status(500).json({
//             message: "Registration Failed",
//           });

//         }

//         else {

//           res.json({
//             message:
//             "Registration Successful",
//           });

//         }

//       });

// });


// // LOGIN API

// app.post("/login", (req, res) => {

//   const { email, password } = req.body;

//   const sql =
//   "SELECT * FROM users WHERE email=?";

//   db.query(sql, [email],

//       async (err, result) => {

//         if(err) {

//           res.status(500).json({
//             message: "Login Failed",
//           });

//         }

//         else if(result.length === 0) {

//           res.status(401).json({
//             message:
//             "Invalid Email",
//           });

//         }

//         else {

//           const user = result[0];

//           const isMatch =
//           await bcrypt.compare(
//               password,
//               user.password
//           );

//           if(isMatch) {

//             res.json({
//               message:
//               "Login Successful",
//             });

//           }

//           else {

//             res.status(401).json({
//               message:
//               "Wrong Password",
//             });

//           }

//         }

//       });

// });


// // SERVER

// app.listen(5000, () => {

//   console.log(
//       "Server Running on Port 5000"
//   );

// });


















// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");

// const db = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(express.json());


// // REGISTER API

// app.post("/register", async (req, res) => {

//     try {

//         const {
//             name,
//             email,
//             password
//         } = req.body;

//         // CHECK EMPTY FIELDS

//         if(
//             !name ||
//             !email ||
//             !password
//         ) {

//             return res.status(400).json({

//                 success: false,

//                 message:
//                 "Please fill all fields"
//             });
//         }

//         // CHECK EMAIL EXISTS

//         const checkSql =
//         "SELECT * FROM users WHERE email=?";

//         db.query(
//             checkSql,
//             [email],

//             async (checkErr, checkResult) => {

//                 if(checkErr) {

//                     return res.status(500).json({

//                         success: false,

//                         message:
//                         "Database Error"
//                     });
//                 }

//                 // EMAIL ALREADY EXISTS

//                 if(checkResult.length > 0) {

//                     return res.status(409).json({

//                         success: false,

//                         message:
//                         "Email already registered"
//                     });
//                 }

//                 // HASH PASSWORD

//                 const hashedPassword =
//                 await bcrypt.hash(password, 10);

//                 // INSERT USER

//                 const insertSql =

//                 "INSERT INTO users(name,email,password) VALUES(?,?,?)";

//                 db.query(

//                     insertSql,

//                     [
//                         name,
//                         email,
//                         hashedPassword
//                     ],

//                     (insertErr, result) => {

//                         if(insertErr) {

//                             return res.status(500).json({

//                                 success: false,

//                                 message:
//                                 "Registration Failed"
//                             });
//                         }

//                         res.json({

//                             success: true,

//                             message:
//                             "Registration Successful"
//                         });
//                     }
//                 );
//             }
//         );
//     }

//     catch(error) {

//         res.status(500).json({

//             success: false,

//             message:
//             "Server Error"
//         });
//     }
// });


// // LOGIN API

// app.post("/login", (req, res) => {

//     try {

//         const {
//             email,
//             password
//         } = req.body;

//         // CHECK EMPTY

//         if(
//             !email ||
//             !password
//         ) {

//             return res.status(400).json({

//                 success: false,

//                 message:
//                 "Please enter email and password"
//             });
//         }

//         const sql =
//         "SELECT * FROM users WHERE email=?";

//         db.query(

//             sql,
//             [email],

//             async (err, result) => {

//                 if(err) {

//                     return res.status(500).json({

//                         success: false,

//                         message:
//                         "Login Failed"
//                     });
//                 }

//                 // EMAIL NOT FOUND

//                 if(result.length === 0) {

//                     return res.status(401).json({

//                         success: false,

//                         message:
//                         "Email not registered"
//                     });
//                 }

//                 const user =
//                 result[0];

//                 // COMPARE PASSWORD

//                 const isMatch =

//                 await bcrypt.compare(
//                     password,
//                     user.password
//                 );

//                 // SUCCESS LOGIN

//                 if(isMatch) {

//                     res.json({

//                         success: true,

//                         message:
//                         "Login Successful",

//                         user: {

//                             id:
//                             user.id,

//                             name:
//                             user.name,

//                             email:
//                             user.email
//                         }
//                     });
//                 }

//                 // WRONG PASSWORD

//                 else {

//                     res.status(401).json({

//                         success: false,

//                         message:
//                         "Wrong Password"
//                     });
//                 }
//             }
//         );
//     }

//     catch(error) {

//         res.status(500).json({

//             success: false,

//             message:
//             "Server Error"
//         });
//     }
// });


// // SERVER

// app.listen(5000, () => {

//     console.log(
//         "Server Running on Port 5000"
//     );

// });

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({

//     service: "gmail",

//     auth: {
//         user: "YOUR_GMAIL@gmail.com",
//         pass: "YOUR_APP_PASSWORD"
//     }
// });

// app.post("/send-otp", (req, res) => {

//     const { email } = req.body;

//     const otp =
//     Math.floor(100000 + Math.random() * 900000)
//     .toString();

//     const sql =
//     "INSERT INTO otp_codes(email, otp) VALUES(?, ?)";

//     db.query(sql, [email, otp], async (err) => {

//         if(err) {

//             return res.json({
//                 success: false,
//                 message: "OTP Failed"
//             });
//         }

//         await transporter.sendMail({

//             from: "YOUR_GMAIL@gmail.com",

//             to: email,

//             subject: "ResumePilot AI OTP",

//             text: `Your OTP is: ${otp}`
//         });

//         res.json({
//             success: true,
//             message: "OTP Sent"
//         });
//     });
// });

// app.post("/verify-otp", (req, res) => {

//     const { email, otp } = req.body;

//     const sql =
//     "SELECT * FROM otp_codes WHERE email=? AND otp=?";

//     db.query(sql, [email, otp], (err, result) => {

//         if(result.length > 0) {

//             res.json({
//                 success: true
//             });
//         }

//         else {

//             res.json({
//                 success: false,
//                 message: "Invalid OTP"
//             });
//         }
//     });
// });

// app.post("/reset-password", async (req, res) => {

//     const { email, password } = req.body;

//     const hashedPassword =
//     await bcrypt.hash(password, 10);

//     const sql =
//     "UPDATE users SET password=? WHERE email=?";

//     db.query(sql,
//         [hashedPassword, email],

//         (err) => {

//             if(err) {

//                 return res.json({
//                     success: false,
//                     message: "Password Update Failed"
//                 });
//             }

//             res.json({
//                 success: true,
//                 message: "Password Updated"
//             });
//         }
//     );
// });





















// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import { connectDB } from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import resumeRoutes from "./routes/resumeRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/resume", resumeRoutes);
// app.use("/api/ai", aiRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server Running on ${PORT}`);
// });















// require("dotenv").config();

// const express =
// require("express");

// const cors =
// require("cors");

// const app =
// express();

// app.use(cors());

// app.use(express.json());

// const resumeRoutes =
// require("./routes/resumeRoutes");

// app.use(
//   "/api/resume",
//   resumeRoutes,
// );

// const PORT =
// process.env.PORT || 5000;

// app.listen(PORT, () => {

//   console.log(

//     `Server Running on Port ${PORT}`,
//   );
// });












// import dotenv from "dotenv";

// dotenv.config();

// import express from "express";

// import cors from "cors";

// import resumeRoutes
// from "./routes/resumeRoutes.js";

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(
//   "/api/resume",
//   resumeRoutes,
// );


// const PORT =
// process.env.PORT || 5000;

// app.listen(PORT, () => {

//   console.log(

//     `Server Running on Port ${PORT}`,
//   );
// });

















// import dotenv from "dotenv";

// dotenv.config();

// import express from "express";

// import cors from "cors";

// import resumeRoutes
// from "./routes/resumeRoutes.js";

// import aiRoutes
// from "./routes/aiRoutes.js";

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(
//   "/api/resume",
//   resumeRoutes,
// );

// app.use(
//   "/api/ai",
//   aiRoutes,
// );

// const PORT =
// process.env.PORT || 5000;

// app.listen(PORT, () => {

//   console.log(
//     `Server Running on Port ${PORT}`,
//   );
// });



















import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  "/api/resume",
  resumeRoutes,
);

app.use(
  "/api/ai",
  aiRoutes,
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});