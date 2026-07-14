export type Movie = {
  id: number;
  title: string;
  poster_url: string;
  genre: string;
  release_year: number;
  description: string;
  rating: number;
};

export type MovieInput = Omit<Movie, "id" | "poster_url">;

export type MovieSortValue = "default" | "rating" | "releaseYear";
