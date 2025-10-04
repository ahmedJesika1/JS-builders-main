import { baseApi } from "../../api/baseApi";


const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getProfiles: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["brochure"],
    }),
   

    

  }),
});
export const {
    
  useGetProfilesQuery,
} = profileApi;