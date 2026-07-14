type MovieFavoritesFilterProps = {
  favoriteCount: number;
  value: boolean;
  onChange: (value: boolean) => void;
};

export function MovieFavoritesFilter({
  favoriteCount,
  value,
  onChange,
}: MovieFavoritesFilterProps) {
  const favoriteCountText =
    favoriteCount === 1 ? "1 favorite" : `${favoriteCount} favorites`;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        className={`rounded-full border px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
          value
            ? "border-sky-400 bg-sky-400 text-slate-950"
            : "border-slate-700 bg-slate-900 text-slate-300 hover:border-sky-400 hover:text-sky-300"
        }`}
        type="button"
        onClick={() => onChange(!value)}
      >
        Favorites only
      </button>
      <p className="text-sm text-slate-300">{favoriteCountText}</p>
    </div>
  );
}
