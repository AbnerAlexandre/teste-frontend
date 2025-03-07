import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer, Feedback, ApiResponse } from '@models';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private apiUrl = 'http://localhost:3000/api/recruiter';
  // To production 
  // private apiUrl = '/api/recruiter';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Developer[]>> {
    return this.http.get<ApiResponse<Developer[]>>(this.apiUrl);
  }

  getById(id: string): Observable<ApiResponse<Developer>> {
    return this.http.get<ApiResponse<Developer>>(`${this.apiUrl}/${id}`);
  }

  deleteDeveloper(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addFeedback(id: string, feedback: Feedback): Observable<ApiResponse<Developer>> {
    return this.http.patch<ApiResponse<Developer>>(`${this.apiUrl}/${id}`, feedback);
  }

  getFilteredDevelopers(filters: any): Observable<ApiResponse<Developer[]>> {
    const cleanedFilters: any = {};
  
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (typeof value === 'string' && value.trim() !== '') {
        cleanedFilters[key] = value.trim();
      }
    });
  
    return this.http.get<ApiResponse<Developer[]>>(`${this.apiUrl}`, {
      params: cleanedFilters,
    });
  }
  
}