import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Link } from 'react-router-dom';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlayPause from './PlayPause';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetTopChartsQuery();
  const divRef = useRef(null);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetching) return <div></div>;
  if (isError) return <div></div>;

  const topPlays = data?.slice(0, 5);

  const TopChartCard = ({
    song,
    i,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
  }) => {
    if (song?.artists && song?.artists?.length > 0) {
      return (
        <div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 rounded-lg cursor-pointer mb-2'>
          <h3 className='font-bold text-base text-white mr-3'>{i + 1}</h3>
          <div className='flex-1 flex flex-row justify-between items-center'>
            <img className='w-20 h-20 rounded-lg' src={song?.images?.coverart} />
            <div className='flex-1 flex flex-col justify-center mx-3'>
              <Link to={`/songs/${song.key}`}>
                <p className='text-xl font-bold text-white'>{song?.title}</p>
              </Link>
              <Link to={`/artist/${song?.artists[0]?.adamid}`}>
                <p className='text-ase font-bold text-gray-300 mt-1'>{song?.subtitle}</p>
              </Link>
            </div>
          </div>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            song={song}
            key={song.key}
          />
        </div>
      );
    }
  };

  return (
    <div
      ref={divRef}
      className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'
    >
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Musica</h2>
          <Link to='/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>Ver mas</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song?.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artistas</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>Ver mas</p>
          </Link>
        </div>

        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topPlays?.map((song) => {
            return (
              <SwiperSlide
                key={song?.key}
                style={{ width: '25%', height: 'auto' }}
                className='rounded-full shadow-lg animate-slideright'
              >
                <Link
                  to={`/artists/${song?.artists?.length > 0 && song?.artists[0]?.adamid}`}
                >
                  <img
                    src={song?.images?.background}
                    alt='song image'
                    className='rounded-full w-full object-cover'
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
