import { baseApi } from "../../api/baseApi";


const appliedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    addApplication: builder.mutation({
        query: (data) => ({
          url: "/job-applicants",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ['applicants'],
  })
   

    

  }),
});
export const {
    useAddApplicationMutation,
} = appliedApi;