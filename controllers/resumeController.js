// import Resume from "../models/resumeModel.js";

// export const saveResume = async (req, res) => {

//   const resume = await Resume.create(req.body);

//   res.json(resume);
// };

// export const getResumes = async (req, res) => {

//   const resumes = await Resume.find();

//   res.json(resumes);
// };
















// const db =
// require("../config/db");

// exports.createResume =
// (req, res) => {

//   const {

//     fullName,
//     role,
//     email,
//     phone,
//     address,
//     github,
//     linkedin,
//     portfolio,
//     summary,
//     skills,
//     experience,
//     education,
//     projects,
//     achievements,
//     certifications,
//     languages,

//   } = req.body;

//   const sql = `

//   INSERT INTO resumes (

//     fullName,
//     role,
//     email,
//     phone,
//     address,
//     github,
//     linkedin,
//     portfolio,
//     summary,
//     skills,
//     experience,
//     education,
//     projects,
//     achievements,
//     certifications,
//     languages

//   )

//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

//   `;

//   db.query(

//     sql,

//     [

//       fullName,
//       role,
//       email,
//       phone,
//       address,
//       github,
//       linkedin,
//       portfolio,
//       summary,

//       JSON.stringify(skills),

//       JSON.stringify(experience),

//       JSON.stringify(education),

//       JSON.stringify(projects),

//       JSON.stringify(achievements),

//       JSON.stringify(certifications),

//       JSON.stringify(languages),
//     ],

//     (err, result) => {

//       if (err) {

//         return res.status(500).json({

//           success: false,

//           message:
//           "Resume Save Failed",

//           error: err,
//         });
//       }

//       res.status(200).json({

//         success: true,

//         message:
//         "Resume Saved Successfully",
//       });
//     },
//   );
// };

// exports.getResumes =
// (req, res) => {

//   const sql =
//   "SELECT * FROM resumes";

//   db.query(

//     sql,

//     (err, result) => {

//       if (err) {

//         return res.status(500).json({

//           success: false,

//           error: err,
//         });
//       }

//       res.status(200).json({

//         success: true,

//         data: result,
//       });
//     },
//   );
// };









import db
from "../config/db.js";

export const createResume =

(req, res) => {

  const {

    fullName,
    role,
    email,

  } = req.body;

  const sql =

  `INSERT INTO resumes
  (fullName, role, email)

  VALUES (?, ?, ?)`;

  db.query(

    sql,

    [
      fullName,
      role,
      email,
    ],

    (err, result) => {

      if (err) {

        return res.status(500).json({

          success: false,

          error: err,
        });
      }

      res.status(200).json({

        success: true,

        message:
        "Resume Saved",
      });
    },
  );
};