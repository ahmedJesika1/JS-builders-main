import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseUrl = "https://server.blbuildersltd.com/api/v1"
export const baseUrl = "http://localhost:8001/api/v1"


export const baseApi = createApi({
  reducerPath: baseUrl,
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: [
    "banners",
    "about",
    "service",
    "values",
    "images",
    "video",
    "development",
    "brochure",
    "contact",
    "experience",
    "team",
    "client",
    "events",
    "publications",
    "news",
    "careers",
    "applicants",
  ],
  endpoints: () => ({}),
});
