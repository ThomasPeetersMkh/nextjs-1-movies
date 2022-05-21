import axios from "axios";
import Link from "next/link";

const index = ({ movies }) => {
  return (
    <>
      <header>
        <h1>Popular Movies</h1>
      </header>
      {movies && (
        <ul className="movieList">
          {movies.map(({ id, title, poster_path, overview }) => {
            return (
              <Link key={id} href={`movie/${id}`}>
                <li>
                  <a>
                    <h2>{title}</h2>
                    <div className="imgHolder">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={`poster for ${title}`}
                      />
                    </div>
                    <p>{overview}</p>
                  </a>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default index;

export async function getStaticProps() {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/movie/popular?api_key=05e52833118c0af4976affdcc1b4af36&language=en-US&page=1"
  );
  return {
    props: { movies },
  };
}
