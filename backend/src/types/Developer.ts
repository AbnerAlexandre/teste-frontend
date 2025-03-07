export interface IDeveloper {
    name: string;
    email: string;
    cellnumber: string
    city: string;
    academicFormation: string;
    skills: string[];
    githubUsername: string;
    avatarUrl?: string;
    feedbacks: IFeedback[] 
  }

export interface IFeedback {
  comment: string;
  recruiterName: string;
}