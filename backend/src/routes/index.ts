import { Router, Request, Response } from "express";

// Routes
import AuthRoutes from "./Auth.Routes";
import PlayerRoutes from "./Player.Routes";

// API Router
const router = Router();

// Routes
router.get("/", (req: Request, res: Response): void => {
    res.send("SecDeck - Cyber Secuirty Card Game!")
});

// Endpoints
router.use("/auth", AuthRoutes);
router.use("/player", PlayerRoutes);

export default router;