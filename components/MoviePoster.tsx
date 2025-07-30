import { Movie, SimilarMovie } from "@/types";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

function MoviePoster({
  index,
  similarityRating,
  movie,
}: {
  index?: number;
  similarityRating?: number;
  movie: Movie | SimilarMovie;
}) {
  return (
    <Link key={movie._id} href={`/movie/${movie._id}`} className="">
      <div className="relative group">
        <ImageWithFallback
          className="min-w-64 max-w-64 h-96 object-cover rounded-lg shadow-xl border border-dark-border group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
          src={movie.Poster}
          alt={movie.Title}
        />

        {similarityRating && (
          <div className="absolute w-14 h-14 flex items-center justify-center bottom-0 right-0 bg-gradient-to-br from-orange-500 to-red-500 bg-opacity-90 p-2 rounded-full m-5 font-bold text-white shadow-lg">
            {similarityRating}%
          </div>
        )}

        {index && (
          <div className="absolute text-gray-500/50 top-32 -left-10 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {index}
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-lg font-semibold line-clamp-1 w-64 text-dark-text group-hover:text-purple-400 transition-colors duration-300">{movie.Title}</p>
        <p className="text-dark-muted line-clamp-1">{movie.Genre}</p>
      </div>
    </Link>
  );
}

export default MoviePoster;
