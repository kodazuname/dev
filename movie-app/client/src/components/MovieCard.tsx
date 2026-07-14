import { type Movie } from "@/types/movie.ts";

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  isDeleting: boolean;
  onToggleFavorite: (movieId: Movie["id"]) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
};

export function MovieCard({
  movie,
  isFavorite,
  isDeleting,
  onToggleFavorite,
  onEdit,
  onDelete,
}: MovieCardProps) {
  const { id, title, poster_url, genre, release_year, description, rating } =
    movie;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-50 text-slate-950 shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30">
      <img
        className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        src={poster_url}
        alt={title}
      />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <button
            className={`rounded-full border px-3 py-1 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
              isFavorite
                ? "border-sky-700 bg-sky-700 text-white"
                : "border-slate-300 text-slate-700 hover:border-sky-700 hover:text-sky-700"
            }`}
            type="button"
            disabled={isDeleting}
            onClick={() => onToggleFavorite(id)}
          >
            {isFavorite ? "Saved" : "Save"}
          </button>
        </div>
        <p className="text-sm text-slate-600">
          {genre} • {release_year}
        </p>
        <p className="text-sm leading-6 text-slate-700">{description}</p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-sky-700">★ {rating}</p>
          <div className="flex gap-2">
            <button
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-700 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              type="button"
              disabled={isDeleting}
              onClick={() => onEdit(movie)}
            >
              Edit
            </button>
            <button
              className="rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:border-red-700 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              disabled={isDeleting}
              onClick={() => onDelete(movie)}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
