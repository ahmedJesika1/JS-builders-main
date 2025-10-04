import { baseApi } from "../../api/baseApi";


const developmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getDevelopment: builder.query({
      query: () => ({
        url: "/development-process",
        method: "GET",
      }),
      providesTags: ["development"],
    }),

    

  }),
});
export const {
 
  useGetDevelopmentQuery,

} = developmentApi;