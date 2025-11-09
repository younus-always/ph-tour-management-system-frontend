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
                  query: () => ({
                        url: "/division",
                        method: "GET"
                  }),
                  providesTags: ["DIVISION"],
                  transformResponse: (res) => {
                        return {
                              data: [...res.data],
                              meta: res.meta
                        }
                  }
            }),

      })
});

export const { useAddDivisionMutation, useGetDivisionsQuery, useDeleteDivisionMutation } = divisionApi;