import express from "express";

import { login, register, me } from "../../controllers/user";
import { authenticateJWT } from "../../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateJWT, me);

export default router;
