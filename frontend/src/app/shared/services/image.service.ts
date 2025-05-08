import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:5000/api/images';

  constructor(private http: HttpClient) { }

  getImagesByCollection(collection: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/collection/${collection}`)
      .pipe(
        catchError(this.handleError<Image[]>(`getImagesByCollection(${collection})`, []))
      );
  }

  getImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Image>(`getImageById(${id})`))
      );
  }

  getAllCollections(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/collections/all`)
      .pipe(
        catchError(this.handleError<string[]>('getAllCollections', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}