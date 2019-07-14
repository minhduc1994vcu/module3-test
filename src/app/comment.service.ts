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

  getCommentsByPostId(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API_URL}?postId=${id}`);
  }
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API_URL}/${id}`);
  }
}
