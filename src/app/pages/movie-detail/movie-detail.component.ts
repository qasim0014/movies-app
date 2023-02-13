import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGE_SIZES } from 'src/app/constants/image-sizes';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  imagesSizes = IMAGE_SIZES;
  similarMovies: Movie[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getMovie(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
    });
  }
}
