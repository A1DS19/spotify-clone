import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import Error from '../components/Error';
import ArtistCard from '../components/ArtistCard';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title={'Buscando musica top...'} />;
  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold sm:text-xl text-3xl text-white text-left mt-4 mb-10'>
        Top Artistas
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((track, i) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
