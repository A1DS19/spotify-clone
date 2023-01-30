import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SongCard from '../components/SongCard';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title={'Buscando musica top...'} />;
  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold sm:text-xl text-3xl text-white text-left mt-4 mb-10'>
        Descubre Musica Top
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((track, i) => (
          <SongCard
            key={track.key}
            song={track}
            activeSong={activeSong}
            data={data}
            i={i}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
