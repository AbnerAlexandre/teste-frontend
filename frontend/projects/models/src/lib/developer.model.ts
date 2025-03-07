export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Feedback {
  comment: string;
  recruiterName: string;
}
  
export interface Developer {
  _id?: string;
  name: string;
  email: string;
  cellnumber: string;
  city: string;
  academicFormation: string;
  skills: string[] | string;
  githubUsername: string;
  avatarUrl?: string;
  feedbacks?: Feedback[];
}