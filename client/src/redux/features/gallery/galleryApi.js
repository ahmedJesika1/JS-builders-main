import { baseApi } from "../../api/baseApi";


const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getImages: builder.query({
      query: () => ({
        url: "/gallery",
        method: "GET",
      }),
      providesTags: ["images"],
    }),
    getVideos: builder.query({
      query: () => ({
        url: "/video",
        method: "GET",
      }),
      providesTags: ["video"],
    }),


    getLatestImages: builder.query({
      query: () => ({
        url: "/latest-gallery",
        method: "GET",
      }),
      providesTags: ["images"],
    }),

    

  }),
});
export const {
  useGetImagesQuery,
  useGetVideosQuery,
  useGetLatestImagesQuery,
} = galleryApi;