import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer, ApiResponse } from '@models';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = 'http://localhost:3000/api/developers';
  // To production 
  // private apiUrl = '/api/developers';

  constructor(private http: HttpClient) {}

  create(developer: Developer): Observable<ApiResponse<Developer>> {
    return this.http.post<ApiResponse<Developer>>(this.apiUrl, developer);
  }

  update(id: string, developer: Developer): Observable<ApiResponse<Developer>> {
    return this.http.put<ApiResponse<Developer>>(`${this.apiUrl}/${id}`, developer);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: string): Observable<ApiResponse<Developer>> {
    return this.http.get<ApiResponse<Developer>>(`${this.apiUrl}/${id}`);
  }

  getGithubUser(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
  }

  returnFormError(
    errorName: 'required' | 'minlength' | 'maxlength' | 'email',
    inputNameErrorDisplay: string,
    details?: any
  ): string {
    return this[errorName](inputNameErrorDisplay, details);
  }

  required(inputName: string): string {
    return `É obrigatório preencher o ${inputName}.`;
  }

  email(inputName: string): string {
    return `Precisa preencher no formato de e-mail.`;
  }

  minlength(inputName: string, details: any): string {
    return `O minimo de caracteres é ${details.requiredLength}.`;
  }
  
  maxlength(inputName: string, details: any): string {
    return `O máximo de caracteres é ${details.requiredLength}.`;
  }
}
