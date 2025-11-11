import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";

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
                  query: (params) => ({
                        url: "/tour/tour-types",
                        method: "GET",
                        params
                  }),
                  providesTags: ["TOUR"],
                  transformResponse: (res) => ({
                        data: [...res.data],
                        meta: res.meta
                  })
            }),
            deleteTourType: builder.mutation({
                  query: (tourTypeId: string) => ({
                        url: `/tour/tour-types/${tourTypeId}`,
                        method: "DELETE"
                  }),
                  invalidatesTags: ["TOUR"]
            }),
            addTour: builder.mutation({
                  query: (tourData) => ({
                        url: "/tour/create",
                        method: "POST",
                        data: tourData
                  }),
                  invalidatesTags: ["TOUR"]
            }),
            getAllTours: builder.query<ITourPackage[], unknown>({
                  query: (params) => ({
                        url: "/tour",
                        method: "GET",
                        params: params
                  }),
                  providesTags: ["TOUR"],
                  transformResponse: (res: IResponse<ITourPackage[]>) => res.data
            }),
            deleteTour: builder.mutation({
                  query: (tourId: string) => ({
                        url: `/tour/${tourId}`,
                        method: "DELETE"
                  }),
                  invalidatesTags: ["TOUR"]
            }),

      })
});

export const { useAddTourTypeMutation, useGetTourTypesQuery, useDeleteTourTypeMutation, useAddTourMutation, useGetAllToursQuery, useDeleteTourMutation } = tourApi;