import { Request, Response } from "express";

// Service
import AuthService from "../services/Auth.Service";
import PlayerService from "../services/Player.Service";

class AuthController {

    static loginPlayer = async (req: Request, res: Response) => {

        try {
            const { username, password } = req.body;

            // Check that username and password were provided.
            const hasRequiredProps = await PlayerService.hasRequiredProperties(req.body);
            if (!hasRequiredProps) {
                return res.status(400).json({
                    success: false,
                    message: "A username and password are required for registration.",
                });
            }

            // Get player data from database
            const player = await PlayerService.getPlayerByUsername(username);
            if (!player) {
                return res.status(400).json({
                    success: false,
                    message: "No players exist with this username.",
                });
            }

            // Check if password matches
            const passwordMatches = await AuthService.doesPasswordMatch(password, player);
            if (!passwordMatches) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials. Try again later.",
                });
            }

            // Remove password before returning player
            if (player) {
                player.password = "";
            }

            // Generate JWT for new player
            const playerToken = await AuthService.signJWT(player);

            return res.status(200).json({
                success: true,
                data: player,
                token: playerToken,
                message: "Successfully logged in. Welcome back to SecDeck!",
            });

        } catch (error) {
            // TODO: Log Error
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Failed to register new player. Try again later."
            })
        }
    }

    static registerPlayer = async (req: Request, res: Response) => {

        try {
            const { username, password } = req.body;

            // Check that username and password were provided.
            const hasRequiredProps = await PlayerService.hasRequiredProperties(req.body);
            if (!hasRequiredProps) {
                return res.status(400).json({
                    success: false,
                    message: "A username and password are required for registration.",
                });
            }

            // Check if user with same username already exists
            const usernameIsAvailable = await PlayerService.isUsernameUnique(username);
            if (!usernameIsAvailable) {
                return res.status(400).json({
                    success: false,
                    message: "Username is already taken. Try something else.",
                });
            }

            // Hash password so we can securely persist new user to DB.
            const playerData = { ...req.body, password: AuthService.encryptPassword(req.body?.password) };

            // Create new player
            const newPlayer = await PlayerService.createNewplayer(playerData);
            newPlayer.password = "";

            // Generate JWT for new player
            const playerToken = await AuthService.signJWT(newPlayer);

            return res.status(200).json({
                success: true,
                data: newPlayer,
                token: playerToken,
                message: "Successfully registered. Welcome to SecDeck!",
            });

        } catch (error) {
            // TODO: Log Error
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Failed to register new player. Try again later."
            })
        }
    }

}

export default AuthController;