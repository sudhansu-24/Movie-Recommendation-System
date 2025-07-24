import MoviePoster from "@/components/MoviePoster";
import db from "@/db";
import { Movie, SimilarMovie } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function MoviePage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const movies = db.collection("movies");

  // Get current movie
  const movie = (await movies.findOne({ _id: id })) as Movie | null;
  if (!movie) return notFound();

  // Get similar movies - Use vectorize approach if no vector exists
  const similarMovies = (await movies
    .find(
      {
        _id: { $ne: id }, // Exclude current movie
      },
      movie.$vector && movie.$vector.length > 0 
        ? {
            // Use vector similarity if vector exists
            sort: { 
              $vector: movie.$vector
            },
            limit: 5,
            includeSimilarity: true,
          }
        : {
            // Use vectorize approach if no vector (like search page)
            vectorize: movie.$vectorize || `${movie.Title} ${movie.Genre} ${movie.Director}`,
            limit: 5,
            projection: { $vector: 0 }, // Exclude vectors from output
          }
    )
    .toArray()) as SimilarMovie[];

  // Debug logging to see what movies are being returned
  console.log(`\n=== SIMILAR MOVIES DEBUG for "${movie.Title}" ===`);
  console.log('Current movie ID:', id);
  console.log('Vector exists:', !!movie.$vector);
  console.log('Vector length:', movie.$vector?.length || 0);
  console.log('$vectorize exists:', !!movie.$vectorize);
  console.log('$vectorize content:', movie.$vectorize ? movie.$vectorize.substring(0, 100) + '...' : 'N/A');
  console.log('Movie object keys:', Object.keys(movie));
  console.log('Fields starting with $:', Object.keys(movie).filter(key => key.startsWith('$')));
  console.log('Similar movies found:', similarMovies.length);
  similarMovies.forEach((sim, i) => {
    console.log(`${i + 1}. ${sim.Title} (ID: ${sim._id}, Similarity: ${Math.round((sim.$similarity || 0) * 100)}%)`);
  });
  console.log('=====================================\n');

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0">
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={300}
          height={450}
          className="shrink-0 rounded-lg "
          priority
        />
        <div className="px-2 md:px-10 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600">{movie.Genre}</p>

          <div className="mt-auto grid grid-cols-2">
            <div className="font-semibold">
              <p>Directed by</p>
              <p>Featuring</p>
              <p>Box Office:</p>
              <p>Released:</p>
              <p>Runtime:</p>
              <p>Rated:</p>
              <p>IMDB Rating:</p>
              <p>Language:</p>
              <p>Country:</p>
            </div>
            <div>
              <p>{movie.Director}</p>
              <p>{movie.Actors}</p>
              <p>{movie.BoxOffice}</p>
              <p>{movie.Released}</p>
              <p>{movie.Runtime}</p>
              <p>{movie.Rated}</p>
              <p>{movie.imdbRating}</p>
              <p>{movie.Language}</p>
              <p>{movie.Country}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-3xl pt-10 pl-10 font-bold ">
          Similar Films you may like
        </h2>
        
        {similarMovies.length > 0 ? (
          <div className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll">
            {similarMovies.map((movie, i) => (
              <MoviePoster
                key={movie._id}
                index={i + 1}
                similarityRating={Math.round((movie.$similarity || 0) * 100)}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <p className="p-10 text-gray-500">No similar movies found</p>
        )}
      </div>
    </div>
  );
}

export default MoviePage;