import prisma from "../config/database";

// const JWT_SECRET = process.env.JWT_SECRET as Secret;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

class PlayerService {

    // Check if player was provided with username & password
    static hasRequiredProperties = async (player: any) => {
        const { username, password } = player;
        if (!(username && password)) {
            return false;
        }
        return true;
    }

    // Check if a player with the given username already exists
    static isUsernameUnique = async (username: string) => {
        const user = await prisma.player.findUnique({
            where: {
                username: username,
            },
        });
        return user ? false : true;
    }

    // Create and persist a new player with the given data
    static createNewplayer = async (player: any) => {
        const newPlayer = await prisma.player.create({
            data: {
                ...player
            }
        });
        return newPlayer;
    }

    // Return player data using username
    static getPlayerByUsername = async (username: string) => {
        const player = await prisma.player.findUnique({
            where: {
                username: username
            }
        });
        return player;
    }
}

export default PlayerService;