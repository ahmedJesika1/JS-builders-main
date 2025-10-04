import { baseApi } from "../../api/baseApi";

const brochureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrochures: builder.query({
      query: () => ({
        url: "/brochure",
        method: "GET",
      }),
      providesTags: ["brochure"],
    }),
  }),
});
export const { useGetBrochuresQuery } = brochureApi;
