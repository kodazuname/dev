import { useEffect, useState, type FormEvent } from "react";
import { type Movie, type MovieInput } from "@/types/movie.ts";

const emptyMovie: MovieInput = {
  title: "",
  genre: "",
  release_year: new Date().getFullYear(),
  description: "",
  rating: 0,
};

type MovieFormProps = {
  movieToEdit: Movie | null;
  isSaving: boolean;
  errorMessage: string | null;
  onSubmit: (movie: MovieInput) => Promise<boolean>;
  onCancel: () => void;
};

export function MovieForm({
  movieToEdit,
  isSaving,
  errorMessage,
  onSubmit,
  onCancel,
}: MovieFormProps) {
  const [movie, setMovie] = useState<MovieInput>(emptyMovie);

  useEffect(() => {
    if (movieToEdit) {
      setMovie({
        title: movieToEdit.title,
        genre: movieToEdit.genre,
        release_year: movieToEdit.release_year,
        description: movieToEdit.description,
        rating: movieToEdit.rating,
      });
    } else {
      setMovie(emptyMovie);
    }
  }, [movieToEdit]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const wasSaved = await onSubmit(movie);
    if (wasSaved) {
      setMovie(emptyMovie);
    }
  }

  return (
    <form
      className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 sm:p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold">
        {movieToEdit ? "Edit movie" : "Add a movie"}
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        {movieToEdit
          ? "Update the movie details, then save your changes."
          : "New movies use the default poster until image uploads are added later."}
      </p>

      {errorMessage && (
        <p
          className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Title
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-normal text-white outline-none focus:border-sky-400"
            type="text"
            value={movie.title}
            minLength={1}
            maxLength={100}
            required
            disabled={isSaving}
            onChange={(event) =>
              setMovie({ ...movie, title: event.currentTarget.value })
            }
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Genre
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-normal text-white outline-none focus:border-sky-400"
            type="text"
            value={movie.genre}
            minLength={1}
            maxLength={50}
            required
            disabled={isSaving}
            onChange={(event) =>
              setMovie({ ...movie, genre: event.currentTarget.value })
            }
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Release year
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-normal text-white outline-none focus:border-sky-400"
            type="number"
            value={movie.release_year}
            min={1}
            required
            disabled={isSaving}
            onChange={(event) =>
              setMovie({
                ...movie,
                release_year: Number(event.currentTarget.value),
              })
            }
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Rating
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-normal text-white outline-none focus:border-sky-400"
            type="number"
            value={movie.rating}
            min={0}
            max={10}
            step={0.1}
            required
            disabled={isSaving}
            onChange={(event) =>
              setMovie({ ...movie, rating: Number(event.currentTarget.value) })
            }
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
          Description
          <textarea
            className="min-h-28 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-normal text-white outline-none focus:border-sky-400"
            value={movie.description}
            minLength={1}
            maxLength={500}
            required
            disabled={isSaving}
            onChange={(event) =>
              setMovie({ ...movie, description: event.currentTarget.value })
            }
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-lg bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : movieToEdit
              ? "Save changes"
              : "Add movie"}
        </button>
        {movieToEdit && (
          <button
            className="rounded-lg border border-slate-600 px-5 py-3 font-semibold text-slate-200 hover:border-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            type="button"
            disabled={isSaving}
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
