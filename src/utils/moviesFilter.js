import { SHORT_MOVIES } from "./constants";

export function moviesFilterDuration (movies) {
    return movies.filter(movie => movie.duration < SHORT_MOVIES);
}

export function moviesFilter (moviesList, movieToSearch) {
  const moviesAfterSearch = moviesList.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const searchQuery = movieToSearch.toLowerCase().trim();
    return movieRu.includes(searchQuery) || movieEn.includes(searchQuery);
  });
  return moviesAfterSearch;
}

