import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addDivision: builder.mutation({
                  query: (payload) => ({
                        url: "/division/create",
                        method: "POST",
                        data: payload
                  }),
                  invalidatesTags: ["DIVISION"]
            }),
            deleteDivision: builder.mutation({
                  query: (id: string) => ({
                        url: `/division/${id}`,
                        method: "DELETE"
                  }),
                  invalidatesTags: ["DIVISION"]
            }),
            getDivisions: builder.query({
                  query: (params) => ({
                        url: "/division",
                        method: "GET",
                        params
                  }),
                  providesTags: ["DIVISION"],
                  transformResponse: (res) => res.data
            }),

      })
});

export const { useAddDivisionMutation, useGetDivisionsQuery, useDeleteDivisionMutation } = divisionApi;