import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SongCard from '../components/SongCard';

const CountryTracks = () => {
  const [country, setCountry] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  React.useEffect(() => {
    axios
      .get('https://geo.ipify.org/api/v2/country?apiKey=at_GscZBJgFtvwv3zDLiA11kay8d4ssM')
      .then((res) => {
        setRegion(res?.data?.location?.region);
        setCountry(res?.data?.location?.country);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isFetching && loading) return <Loader title={'Buscando musica a mi alrededor'} />;
  if (error && country) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold sm:text-xl text-3xl text-white text-left mt-4 mb-10'>
        Top musica en la {region}
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

export default CountryTracks;
