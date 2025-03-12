import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types";

export function mapDecodedUser(user: JwtPayload): IUser {
  return {
    _id: String(user._id),
    username: String(user.username),
    createdAt: new Date(user.createdAt),
  };
}
