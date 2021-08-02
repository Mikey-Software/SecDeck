import prisma from "../config/database";
import { Request, Response } from "express";

class UserController {

    static getAllPlayers = async (req: Request, res: Response) => {
        const players = await prisma.player.findMany();

        res.status(200).json({
            success: true,
            data: players
        })
    }

}

export default UserController;