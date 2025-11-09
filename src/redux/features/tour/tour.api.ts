import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addTourType: builder.mutation({
                  query: (tourTypeName: string) => ({
                        url: "/tour/create-tour-type",
                        method: "POST",
                        data: tourTypeName
                  }),
                  invalidatesTags: ["TOUR"]
            }),
            getTourTypes: builder.query({
                  query: () => ({
                        url: "/tour/tour-types",
                        method: "GET"
                  }),
                  providesTags: ["TOUR"],
                  transformResponse: (res) => {
                        return {
                              data: [...res.data],
                              meta: res.meta
                        }
                  }
            }),
            deleteTourType: builder.mutation({
                  query: (tourTypeId: string) => ({
                        url: `/tour/tour-types/${tourTypeId}`,
                        method: "DELETE"
                  }),
                  invalidatesTags: ["TOUR"]
            }),
      })
});

export const { useAddTourTypeMutation, useGetTourTypesQuery, useDeleteTourTypeMutation } = tourApi;