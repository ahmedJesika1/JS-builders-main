import { baseApi } from "../../api/baseApi";


const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getNews: builder.query({
      query: () => ({
        url: "/news",
        method: "GET",
      }),
      providesTags: ["news"],
    }),
   

    

  }),
});
export const {
    useGetNewsQuery,
  
  
} = newsApi;