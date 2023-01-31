import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SongCard from '../components/SongCard';
import { useSelector } from 'react-redux';

const Search = () => {
  const { searchTerm } = useParams();
  const { data, error, isLoading } = useGetSongsBySearchQuery(searchTerm);
  const songs = data?.tracks?.hits?.map((song) => song.track);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isLoading) return <Loader title='Cargando canciones...' />;
  if (error) return <Error title='Error cargando canciones' error={error} />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold sm:text-xl text-3xl text-white text-left mt-4 mb-10'>
        Resultados para <span className='font-black'>{searchTerm}</span>
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {songs?.map((track, i) => (
          <SongCard
            key={track.key}
            song={track}
            activeSong={activeSong}
            data={track}
            i={i}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
