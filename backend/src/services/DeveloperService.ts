import Developer, { DeveloperDocument } from '../models/Developer';
import { IDeveloper } from '../types/Developer';

class DeveloperService {
  async createDeveloper(data: IDeveloper): Promise<DeveloperDocument> {
    return Developer.create(data);
  }

  async getAllDevelopers(): Promise<DeveloperDocument[]> {
    return Developer.find();
  }

  async getFilteredDevelopers(filters: any): Promise<DeveloperDocument[]> {
    return Developer.find(filters);
  }

  async getDeveloperById(id: string): Promise<DeveloperDocument | null> {
    return Developer.findById(id);
  }

  async updateDeveloper(id: string, data: IDeveloper): Promise<DeveloperDocument | null> {
    return Developer.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteDeveloper(id: string): Promise<DeveloperDocument | null> {
    return Developer.findByIdAndDelete(id);
  }

  async addFeedback(id: string, comment: string, recruiterName: string): Promise<DeveloperDocument | null> {
    return Developer.findByIdAndUpdate(
      id,
      { $push: { feedbacks: { comment, recruiterName } } },
      { new: true }
    );
  }
}

export default new DeveloperService();