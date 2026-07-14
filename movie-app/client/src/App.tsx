import { useState } from "react";
import { EmptyState } from "@/components/EmptyState.tsx";
import { MovieFavoritesFilter } from "@/components/MovieFavoritesFilter.tsx";
import { MovieForm } from "@/components/MovieForm.tsx";
import { MovieGenreFilter } from "@/components/MovieGenreFilter.tsx";
import { MovieList } from "@/components/MovieList.tsx";
import { MovieSearch } from "@/components/MovieSearch.tsx";
import { MovieSort } from "@/components/MovieSort.tsx";
import { useMovieCatalog } from "@/hooks/useMovieCatalog.ts";
import { type Movie, type MovieInput } from "@/types/movie.ts";

function App() {
  const catalog = useMovieCatalog();
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  async function handleMovieSubmit(movieInput: MovieInput): Promise<boolean> {
    let wasSaved: boolean;
    if (movieToEdit) {
      wasSaved = await catalog.editMovie(movieToEdit.id, movieInput);
    } else {
      wasSaved = await catalog.addMovie(movieInput);
    }

    if (wasSaved) {
      setMovieToEdit(null);
    }
    return wasSaved;
  }

  async function handleMovieDelete(movie: Movie) {
    const shouldDelete = window.confirm(`Delete "${movie.title}"?`);
    if (!shouldDelete) {
      return;
    }

    const wasDeleted = await catalog.removeMovie(movie.id);
    if (wasDeleted && movieToEdit?.id === movie.id) {
      setMovieToEdit(null);
    }
  }

  const movieCountText =
    catalog.visibleMovies.length === 1
      ? "1 movie"
      : `${catalog.visibleMovies.length} movies`;
  const emptyStateVariant =
    catalog.movies.length === 0
      ? "catalog"
      : catalog.favoritesOnly && catalog.favoriteIds.length === 0
        ? "favorites"
        : "filters";

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white sm:px-6 sm:py-16">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs font-bold tracking-[0.2em] text-sky-300 uppercase">
          Movies App
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Find your next movie
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">
          A small React project for learning components, props, lists, state,
          and data from a FastAPI backend.
        </p>

        <MovieForm
          movieToEdit={movieToEdit}
          isSaving={catalog.isSaving}
          errorMessage={catalog.mutationError}
          onSubmit={handleMovieSubmit}
          onCancel={() => setMovieToEdit(null)}
        />

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
            <MovieSearch value={catalog.search} onChange={catalog.setSearch} />
            <MovieGenreFilter
              genres={catalog.genres}
              value={catalog.selectedGenre}
              onChange={catalog.setSelectedGenre}
            />
            <MovieSort value={catalog.sortBy} onChange={catalog.setSortBy} />
          </div>

          <MovieFavoritesFilter
            favoriteCount={catalog.favoriteIds.length}
            value={catalog.favoritesOnly}
            onChange={catalog.setFavoritesOnly}
          />
        </div>

        {catalog.isLoading ? (
          <p
            className="mt-8 rounded-lg bg-slate-900 p-6 text-center text-slate-300"
            role="status"
          >
            Loading movies...
          </p>
        ) : catalog.errorMessage ? (
          <p
            className="mt-8 rounded-lg border border-red-400/30 bg-red-400/10 p-6 text-center text-red-200"
            role="alert"
          >
            {catalog.errorMessage}
          </p>
        ) : catalog.visibleMovies.length > 0 ? (
          <>
            <p className="mt-9 text-sm font-medium text-slate-400">
              Showing {movieCountText}
            </p>
            <MovieList
              movies={catalog.visibleMovies}
              favoriteIds={catalog.favoriteIds}
              deletingMovieId={catalog.deletingMovieId}
              onToggleFavorite={catalog.toggleFavorite}
              onEdit={setMovieToEdit}
              onDelete={handleMovieDelete}
            />
          </>
        ) : (
          <EmptyState
            variant={emptyStateVariant}
            onClearFilters={catalog.clearFilters}
          />
        )}
      </section>
    </main>
  );
}

export default App;
