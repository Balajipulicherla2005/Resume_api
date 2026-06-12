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