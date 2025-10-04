import { baseApi } from "../../api/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: "/client",
        method: "GET",
      }),
      providesTags: ["team"],
    }),
  }),
});
export const { useGetClientsQuery } = clientApi;
