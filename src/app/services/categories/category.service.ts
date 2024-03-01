import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public host = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  categories(): Observable<any> {
    return this.http.get<any>(`${this.host}/categories`);
  }

  getCategory(id: any): Observable<any> {
    return this.http.get<any>(`${this.host}/categories/${id}`);
  }

  saveCategory(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.host}/categories`,
      data,
      this.httpOptions
    );
  }

  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.host}/categories/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`${this.host}/categories/${id}`);
  }
}
