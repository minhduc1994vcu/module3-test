import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly API_URL = 'http://jsonplaceholder.typicode.com/comments';


  constructor(private http: HttpClient) {
  }

  getAllComment(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.API_URL);
  }
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API_URL}/${id}`);
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  createComment(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(this.API_URL, comment);
  }
}
