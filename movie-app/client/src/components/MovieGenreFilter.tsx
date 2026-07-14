type MovieGenreFilterProps = {
  genres: string[];
  value: string;
  onChange: (value: string) => void;
};

export function MovieGenreFilter({
  genres,
  value,
  onChange,
}: MovieGenreFilterProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-slate-300"
        htmlFor="movie-genre"
      >
        Genre
      </label>
      <select
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        id="movie-genre"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
