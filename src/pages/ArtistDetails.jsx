import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title={'Buscando detalles de artista'} />;

  return <Error />;

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
