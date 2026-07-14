type EmptyStateProps = {
  variant: "catalog" | "favorites" | "filters";
  onClearFilters: () => void;
};

export function EmptyState({ variant, onClearFilters }: EmptyStateProps) {
  const content = {
    catalog: {
      title: "No movies available",
      description: "There are no movies to show right now.",
    },
    favorites: {
      title: "No favorite movies yet",
      description: "Save a movie first, then it will appear here.",
    },
    filters: {
      title: "No movies found",
      description: "Try a shorter title or choose another genre.",
    },
  }[variant];

  return (
    <div className="mt-9 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center">
      <h2 className="text-2xl font-bold">{content.title}</h2>
      <p className="mx-auto mt-3 max-w-md text-slate-300">
        {content.description}
      </p>
      {variant !== "catalog" && (
        <button
          className="mt-6 rounded-lg bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          type="button"
          onClick={onClearFilters}
        >
          {variant === "favorites" ? "Show all movies" : "Clear filters"}
        </button>
      )}
    </div>
  );
}
