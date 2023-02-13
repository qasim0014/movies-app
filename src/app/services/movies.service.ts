import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'f1b84e214ec9ccce9888b855fa0b67d4';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming') {
    return this.http.get(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`);
  }
}
