import { SHORT_MOVIES } from "./constants";

export function moviesFilterDuration (movies) {
    return movies.filter(movie => movie.duration < SHORT_MOVIES);
  }