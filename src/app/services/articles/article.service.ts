import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public host = environment.apiURL;
  private _refresh$ = new Subject<void>()
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }),
  };
  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }
  articles(): Observable<any> {
    return this.http.get<any>(`${this.host}/articles`);
  }

  getArticle(id: any): Observable<any> {
    return this.http.get<any>(`${this.host}/articles/${id}`);
  }

  saveArticle(data: FormData){
    return this.http.post<any>(
      `${this.host}/articles`,
      data,
    ).pipe(tap(() => {
        this._refresh$.next();
    }));
  }

  updateArticle(id: any, data: FormData) {
    return this.http.post<FormData>(
      `${this.host}/articles/${id}`,
      data,
    );
  }

  deleteArticle(id: any): Observable<any> {
    return this.http.delete<any>(`${this.host}/articles/${id}`);
  }
}
