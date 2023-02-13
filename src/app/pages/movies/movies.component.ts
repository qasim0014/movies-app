import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMoviesByPage(1);
  }

  getMoviesByPage(page: number) {
    this.moviesService.getUpcomingMoviesByPage(page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    console.log(event);
    this.getMoviesByPage(event.page + 1);
  }
}
