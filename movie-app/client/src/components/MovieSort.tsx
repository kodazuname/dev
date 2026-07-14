import { type MovieSortValue } from "@/types/movie.ts";

const movieSortOptions = [
  { value: "default", label: "Default" },
  { value: "rating", label: "Highest rated" },
  { value: "releaseYear", label: "Newest first" },
] as const;

type MovieSortProps = {
  value: MovieSortValue;
  onChange: (value: MovieSortValue) => void;
};

export function MovieSort({ value, onChange }: MovieSortProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-slate-300"
        htmlFor="movie-sort"
      >
        Sort
      </label>
      <select
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        id="movie-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as MovieSortValue)}
      >
        {movieSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
