from schemas import Movie

DEFAULT_POSTER_URL = "/posters/movie-placeholder.svg"


movies: list[Movie] = [
    Movie(
        id=1,
        title="Starlight Summer",
        poster_url="/posters/starlight-summer.svg",
        release_year=2025,
        genre="Adventure",
        rating=8.7,
        description=(
            "A group of friends discover a glowing map that leads to a summer "
            "they will never forget."
        ),
    ),
    Movie(
        id=2,
        title="City of Echoes",
        poster_url="/posters/city-of-echoes.svg",
        release_year=2024,
        genre="Mystery",
        rating=8.1,
        description=(
            "A young reporter follows strange sounds through a city full of "
            "hidden stories."
        ),
    ),
    Movie(
        id=3,
        title="Ocean Notes",
        poster_url="/posters/ocean-notes.svg",
        release_year=2023,
        genre="Drama",
        rating=7.9,
        description=(
            "Two sisters rebuild their friendship while saving their family "
            "music shop by the sea."
        ),
    ),
    Movie(
        id=4,
        title="Pixel Hearts",
        poster_url="/posters/pixel-hearts.svg",
        release_year=2026,
        genre="Comedy",
        rating=8.4,
        description=(
            "A shy game designer accidentally becomes famous after her tiny "
            "game goes viral."
        ),
    ),
    Movie(
        id=5,
        title="Moonlit Code",
        poster_url="/posters/moonlit-code.svg",
        release_year=2025,
        genre="Sci-Fi",
        rating=8.9,
        description=(
            "A student builds a robot that can read old messages hidden in "
            "moonlight."
        ),
    ),
    Movie(
        id=6,
        title="The Last Train",
        poster_url="/posters/the-last-train.svg",
        release_year=2022,
        genre="Thriller",
        rating=7.6,
        description=(
            "Three strangers must solve one puzzle before the final train "
            "leaves the station."
        ),
    ),
]
