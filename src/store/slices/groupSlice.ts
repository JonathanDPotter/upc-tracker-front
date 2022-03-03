import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/",
  }),
  endpoints: (builder) => ({
    getAllGroups: builder.query({ query: () => "/api/group/" }),
  }),
});

export const { useGetAllGroupsQuery } = groupApi;
