import Link from "next/link";
import axios from "axios";
const Detail = ({ movieDetail: { id, poster_path, title, overview } }) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="movieDetails">
        <div className="imgHolder">
          <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={`poster for ${title}`}
          />
        </div>
        <div className="detailRight">
          <p>{overview}</p>
          <Link href="/">
            <button>ga terug</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Detail;

export async function getStaticPaths() {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/movie/popular?api_key=05e52833118c0af4976affdcc1b4af36&language=en-US&page=1"
  );
  return {
    paths: movies.map(({ id }) => {
      const movieId = String(id);
      return { params: { movieId } };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx) {
  const id = ctx.params.movieId;
  const { data: movieDetail } = await axios(
    `https://api.themoviedb.org/3/movie/${id}?api_key=05e52833118c0af4976affdcc1b4af36&language=en-US`
  );
  return {
    props: {
      movieDetail,
    },
    revalidate: 60 * 60 * 24,
  };
}
