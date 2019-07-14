import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'http://jsonplaceholder.typicode.com/posts';
  private readonly API_URL2 = 'http://jsonplaceholder.typicode.com/comments';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.API_URL);
  }
  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.API_URL}/${id}`);
  }
  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(this.API_URL, post);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${this.API_URL}/${post.id}`, post);
  }
}
