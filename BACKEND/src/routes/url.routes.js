import { Router } from "express";
import {
  createShortUrl,
  redirectToFullUrl,
} from "../controllers/url.controller.js";

const router = Router();

// POST /api/create
router.post("/create", createShortUrl);

// GET /:id
router.get("/:id", redirectToFullUrl);

export default router;
