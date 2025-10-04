import { baseApi } from "../../api/baseApi";


const careerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getCareers: builder.query({
      query: () => ({
        url: "/careers",
        method: "GET",
      }),
      providesTags: ["careers"],
    }),

    getSingleCareer: builder.query({
      query: ({id}) => ({
        url: `/careers/${id}`,
        method: "GET",
      }),
      providesTags: ["careers"],
    }),
  }),
});


export const {
  
    useGetCareersQuery,
    useGetSingleCareerQuery,
   
  
} = careerApi;