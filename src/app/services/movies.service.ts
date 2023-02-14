import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDto, MovieImages, MovieVideoDto, MovieCredits } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'f1b84e214ec9ccce9888b855fa0b67d4';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  // getUpcomingMoviesByPage(page: number) {
  //   return this.http
  //     .get<MovieDto>(`${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`)
  //     .pipe(
  //       switchMap((res) => {
  //         return of(res.results);
  //       })
  //     );
  // }

  getSearchedMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}${uri}?page=${page}&api_key=${this.apiKey}&query=${searchValue}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getMovieGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getMovieByGenre(genreId: string, page: number) {
    console.log(
      `${this.baseUrl}/discover/movie/?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
    );
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie/?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
