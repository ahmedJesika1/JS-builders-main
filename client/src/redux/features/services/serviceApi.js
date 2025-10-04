import { baseApi } from "../../api/baseApi";


const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getServices: builder.query({
      query: (category) => ({
        url: `/service${category ? `?category=${category}` : ""}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    getServicesByPagination: builder.query({
      query: ({page,limit}) => ({
        
        url: `/service/pagination?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    getSingleServices: builder.query({
      query: ({id}) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),

  }),
});
export const {
 
  useGetServicesQuery,
  useGetServicesByPaginationQuery,
  useGetSingleServicesQuery,

} = serviceApi;