import { baseApi } from "../../api/baseApi";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/about-us",
        method: "GET",
      }),
      providesTags: ["about"],
    }),
  }),
});
export const { useGetAboutQuery } = aboutApi;
