type MovieSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MovieSearch({ value, onChange }: MovieSearchProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-slate-300"
        htmlFor="movie-search"
      >
        Search
      </label>
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        id="movie-search"
        type="text"
        placeholder="Search by movie title"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
