import { baseApi } from "../../api/baseApi";


const ValuesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getValues: builder.query({
      query: () => ({
        url: "/our-values",
        method: "GET",
      }),
      providesTags: ["values"],
    }),

    

  }),
});
export const {
 
  useGetValuesQuery,

} = ValuesApi;