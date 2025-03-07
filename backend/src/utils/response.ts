import { Request, Response } from 'express';

export function success(  req: Request,  res: Response,  data: any = null,  message?: string): void {
  let status: number;

  switch (req.method) {
    case 'POST':
      status = 201;
      break;
    case 'DELETE':
      status = 204;
      break;
    default:
      status = 200;
  }

  if (status === 204) {
    res.status(status).end();
    return;
  }

  res.status(status).json({
    success: true,
    message: message || 'Sucesso',
    data
  });
}

export function error(
  res: Response,
  message = 'Erro interno do servidor',
  status = 500,
  errors: any = null
): void {
  res.status(status).json({
    success: false,
    message,
    errors
  });
}
