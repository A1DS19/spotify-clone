import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com',
    prepareHeaders: (headers, { getState }) => {
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_X_RapidAPI_Key);
      headers.set('X-RapidAPI-Host', process.env.REACT_APP_X_RapidAPI_Host);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/v1/charts/world',
    }),
    getSongDetails: builder.query({
      query: (songId) => `/v1/tracks/details?track_id=${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `/v1/tracks/related?track_id=${songId}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsByGenre: builder.query({
      query: (genreId) => `/v1/charts/genre-world?genre_code=${genreId}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
} = shazamCoreApi;
