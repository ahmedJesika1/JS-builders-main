import { baseApi } from "../../api/baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getEvents: builder.query({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["events"],
    }),
   

    

  }),
});
export const {
    
    useGetEventsQuery,
  
 
} = eventApi;