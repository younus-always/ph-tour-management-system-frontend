import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import TourTypeDropdown from "@/components/modules/Admin/TourType/TourTypeDropdown";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTourTypeMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { toast } from "sonner";
import { useState } from "react";
import DashboardPagination from "@/components/modules/Admin/DashboardPagination";


const AddTourType = () => {
      const [deleteTourType] = useDeleteTourTypeMutation();
      const [currentPage, setCurrentPage] = useState(1);
      const [limit, setLimit] = useState(10);
      const { data } = useGetTourTypesQuery({ page: currentPage, limit });
 
      // delete tour-type
      const handleDeleteTourType = async (id: string) => {
            const toastId = toast.loading("Deleting...")
            try {
                  const res = await deleteTourType(id).unwrap();
                  toast.dismiss(toastId);
                  if (res.success) toast.success("Tour Type Deleted")
            } catch (err: any) {
                  toast.dismiss(toastId);
                  toast.error(err.data.message)
            }
      };


      return (
            <div className="w-full max-w-7xl mx-auto px-5 pb-8">
                  <div className="flex justify-between my-8">
                        <h1 className="text-xl font-semibold">Tour Types</h1>
                        <AddTourTypeModal />
                  </div>
                  <div className="border border-muted rounded-md">
                        {
                              data?.data.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 border border-dashed rounded-lg bg-muted/20">
                                          <img
                                                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                                                alt="Empty State"
                                                className="w-24 h-24 opacity-80"
                                          />
                                          <h2 className="text-xl font-semibold text-foreground">
                                                No Tour Type Created Yet
                                          </h2>
                                          <p className="text-muted-foreground text-sm max-w-md">
                                                It seems you haven’t added any tour types yet. Add one to categorize your tours easily.
                                          </p>
                                          <AddTourTypeModal />
                                    </div>
                              ) :
                                    (<Table>
                                          <TableCaption className="sr-only">A list of all tour types.</TableCaption>
                                          <TableHeader>
                                                <TableRow>
                                                      <TableHead className="bg-muted/40">#</TableHead>
                                                      <TableHead className="">Name</TableHead>
                                                      <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                                {data?.data.map((item, idx) => (
                                                      <TableRow key={item._id}>
                                                            <TableCell className="w-10 bg-muted/50 font-medium">{idx + 1}</TableCell>
                                                            <TableCell className="font-medium">{item.name}</TableCell>
                                                            <TableCell className="text-right space-x-1">
                                                                  <TourTypeDropdown onConfirm={() => handleDeleteTourType(item._id)} />
                                                            </TableCell>
                                                      </TableRow>))}
                                          </TableBody>
                                    </Table>)}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center lg:justify-end mt-4">
                        <div>
                              <DashboardPagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} meta={data?.meta} />
                        </div>
                  </div>
            </div>
      )
}

export default AddTourType