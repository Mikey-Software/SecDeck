import { sign, Secret } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";
// 
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

class AuthService {

    // Create JWT Token based on player data
    static signJWT = (player: any) => {
        const token = sign(player, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
        return token;
    }

    // Encrypt raw password string into bcrypt hash
    static encryptPassword = (password: string) => {
        const hashedPassword = hashSync(password, 8);
        return hashedPassword;
    }

    // Check if raw password is equal to encrypted password
    static doesPasswordMatch = (password: string, player: any) => {
        const passwordMatches = compareSync(password, player?.password);
        return passwordMatches;
    }

}

export default AuthService;