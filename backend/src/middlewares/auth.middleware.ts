import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../interfaces/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "please register or login first"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET as string);

    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "invalid token, please login again"
      });
    }

    res.locals.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "not authorized, invalid token"
    })
  }
}


export const authorize = (...roles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      if (!res.locals.user) {
        return res.status(401).json({
          status: "fail",
          message: "not authenticated"
        });
      }

      if (!roles.includes(res.locals.user.role)) {
        return res.status(403).json({
          status: "fail",
          message: "you aren't allowed to access this resource"
        });
      } else if (!res.locals.user.active) {
        return res.status(401).json({
          status: "fail",
          message: "inactive or banned user"
        })
      }

      next();
    } catch (error) {
      return res.status(403).json({
        status: "fail",
        message: "un authorized"
      })
    }
  }
}