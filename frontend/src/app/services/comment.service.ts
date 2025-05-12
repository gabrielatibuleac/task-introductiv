import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Comment {
  _id?: string;
  userId: number;
  userName: string;
  content: string;
  itemId: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5000/api/comments';

  constructor(private http: HttpClient) { }

  // Get all comments
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Comment[]>('getAllComments', []))
      );
  }

  // Get comments for a specific item (mentor or boboc)
  getCommentsByItemId(itemId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/item/${itemId}`)
      .pipe(
        catchError(this.handleError<Comment[]>(`getCommentsByItemId(${itemId})`, []))
      );
  }

  // Add a new comment
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment)
      .pipe(
        catchError(this.handleError<Comment>('addComment'))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}