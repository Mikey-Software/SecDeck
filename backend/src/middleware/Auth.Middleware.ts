import { Response, NextFunction } from "express";
import { verify, Secret } from "jsonwebtoken";

// Types
import { UserRequest } from "../types/UserRequest.Type";

const JWT_SECRET = process.env.JWT_SECRET as Secret;


export const Authenticate = async (req: UserRequest, res: Response, next: NextFunction) => {
    let token: string;
    const authorizationHeader = req.headers["authorization"];

    // Check if request has an authentication header.
    if (!authorizationHeader) {
        return res.status(400).json({
            success: false,
            message: "No authorization strategy was detected.",
        });
    }

    // Check if request has a Bearer JWT.
    if (authorizationHeader.startsWith("Bearer ")) {
        token = authorizationHeader.split(" ")[1];
    } else {
        return res.status(400).json({
            success: false,
            message: "Incorrect authentication strategy detected.",
        });
    }

    // Veirfy JWT Token
    if (token) {
        try {
            const jwtDecoded = verify(token, JWT_SECRET);
            req.user = jwtDecoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "This token is invalid. Please authenticate and try again.",
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "An access token is required to process this request.",
        });
    }
    next();
};

export const Authorize = (...roles: string[]) => {
    return (req: UserRequest, res: Response, next: NextFunction) => {

        // Check if request user is authorized for request/resource.
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    success: false,
                    message: `User ROLE: ${req.user.role} is not authorized to process this request.`,
                })
            );
        }
        next();
    };
};
