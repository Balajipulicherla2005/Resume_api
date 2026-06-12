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