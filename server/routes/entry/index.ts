import { Router } from "express";
import {
  getEntries,
  createEntry,
  updateEntry,
} from "../../controllers/entry/index";
import { authenticateJWT } from "../../middlewares";

const router = Router();

router.post("/", authenticateJWT, createEntry);
router.get("/", authenticateJWT, getEntries);
router.put("/", authenticateJWT, updateEntry);

export default router;
