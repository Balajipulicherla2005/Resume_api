// import express from "express";

// import {
//   saveResume,
//   getResumes,
// } from "../controllers/resumeController.js";

// const router = express.Router();

// router.post("/save", saveResume);

// router.get("/", getResumes);

// export default router;











import express
from "express";

import {

  createResume,

} from
"../controllers/resumeController.js";

const router =
express.Router();

router.post(
  "/create",
  createResume,
);

export default router;