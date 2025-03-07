import { RequestHandler } from 'express';
import developerService from '../services/DeveloperService';
import { success, error } from '../utils/response';

class DeveloperController {
  public create: RequestHandler = async (req, res) => {
    try {
      const developer = await developerService.createDeveloper(req.body);

      return success(req, res, developer);
    } catch (error: any) {
      return error(res, error.message);
    }
  };

  public getAll: RequestHandler = async (req, res) => {
    try {
      const { name, city, email, skills } = req.query;
  
      const filters: any = {};
  
      if (name && name !== 'null') filters.name = { $regex: name, $options: 'i' };
      if (city && city !== 'null') filters.city = { $regex: city, $options: 'i' };
      if (email && email !== 'null') filters.email = { $regex: email, $options: 'i' };
      if (skills && skills !== 'null') filters.skills = { $in: skills.toString().split(',').map((skill) => skill.trim()) };
  
      const developers = await developerService.getFilteredDevelopers(filters);
  
      return success(req, res, developers);
    } catch (error: any) {
      return error(res, error.message);
    }
  };
  

  public getById: RequestHandler = async (req, res) => {
    try {
      const developer = await developerService.getDeveloperById(req.params.id);
      if (!developer) {
        return error(res, 'Dev não encontrado', 404);
      }

      return success(req, res, developer);
    } catch (error: any) {
      return error(res, error.message);
    }
  };

  public update: RequestHandler = async (req, res) => {
    try {
      const developer = await developerService.updateDeveloper(req.params.id, req.body);
      if (!developer) {
        return error(res, 'Dev não encontrado', 404);
      }

      return success(req, res, developer);
    } catch (error: any) {
      return error(res, error.message);
    }
  };

  public delete: RequestHandler = async (req, res) => {
    try {
      const developer = await developerService.deleteDeveloper(req.params.id);
      if (!developer) {
        return error(res, 'Dev não encontrado', 404);
      }

      success(req, res);
    } catch (error: any) {
      return error(res, error.message);
    }
  };

  public addFeedback: RequestHandler = async (req, res) => {
    try {
      const { comment, recruiterName } = req.body;
  
      if (!comment)  return error(res, 'Comentário é obrigatório', 400);
      if (!recruiterName)  return error(res, 'É obrigatório informar o nome', 400);

      const developer = await developerService.addFeedback(req.params.id, comment, recruiterName);
  
      if (!developer) {
        return error(res, 'Dev não encontrado', 404);
      }
  
      return success(req, res, developer);
    } catch (error: any) {
      return error(res, error.message);
    }
  };
  
}

export default new DeveloperController();
