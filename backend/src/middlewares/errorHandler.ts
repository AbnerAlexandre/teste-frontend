import { Request, Response, NextFunction } from 'express';
import { error } from '../utils/response';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  return error(res, err.message || 'Erro interno do servidor', err.status || 500, err.errors || null);
}