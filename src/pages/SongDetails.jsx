import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Loader, RelatedSongs } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery(songid, { refetchOnMountOrArgChange: true });

  const { data: relatedSongs, isFetching: isFetchingRelatedSongs } =
    useGetSongRelatedQuery(songid, { refetchOnMountOrArgChange: true });

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongs, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title={'Buscando detalles de cancion...'} />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <DetailsHeader songData={songData} />
      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
        <div className='mt-5'>
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className='text-gray-400 text-base my-1'>
                {line}
              </p>
            ))
          ) : (
            <p className='text-gray-400 text-base my-1'>Perdon, no encontramos liricas</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
