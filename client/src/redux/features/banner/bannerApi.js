import { baseApi } from "../../api/baseApi";


const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getBanners: builder.query({
        query: () => ({
          url: "/banners",
          method: "GET",
        }),
        providesTags: ["banners"],
      }),
   

    

  }),
});
export const {
    useGetBannersQuery,
  
} = bannerApi;