import { baseApi } from "../../api/baseApi";


const publicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getPublications: builder.query({
      query: () => ({
        url: "/publications",
        method: "GET",
      }),
      providesTags: ["publications"],
    }),
   

    

  }),
});
export const {
    useGetPublicationsQuery,
} = publicationApi;