import { baseApi } from "../../api/baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => ({
        url: "/team",
        method: "GET",
      }),
      providesTags: ["team"],
    }),
  }),
});
export const { useGetTeamsQuery } = teamApi;
