import { type Movie, type MovieInput } from "@/types/movie.ts";

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch("/api/movies");

  if (!response.ok) {
    throw new Error("Failed to load movies");
  }

  return response.json();
}

export async function createMovie(movie: MovieInput): Promise<Movie> {
  const response = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Failed to create movie");
  }

  return response.json();
}

export async function updateMovie(
  movieId: Movie["id"],
  movie: MovieInput,
): Promise<Movie> {
  const response = await fetch(`/api/movies/${movieId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Failed to update movie");
  }

  return response.json();
}

export async function deleteMovie(movieId: Movie["id"]): Promise<void> {
  const response = await fetch(`/api/movies/${movieId}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }
}
