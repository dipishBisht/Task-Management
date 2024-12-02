import User from "../models/user";


//# to add user object in req handler

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
