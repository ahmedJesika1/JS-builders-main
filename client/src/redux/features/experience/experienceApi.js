import { baseApi } from "../../api/baseApi";


const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getExperience: builder.query({
      query: () => ({
        url: "/experience",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),
   

    

  }),
});
export const {
    
  useGetExperienceQuery,
} = experienceApi;