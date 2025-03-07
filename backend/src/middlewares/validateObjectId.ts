import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { error } from '../utils/response';

export function validateObjectId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return error(res, 'ID inválido', 400);
  }
  next();
}