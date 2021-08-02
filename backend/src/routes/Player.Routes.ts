import { Router } from "express";
import UserController from "../controller/Player.Controller";

// Router
const router = Router();

router.get("/", UserController.getAllPlayers);

export default router;