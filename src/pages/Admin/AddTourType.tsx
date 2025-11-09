import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/modules/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTourTypeMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
      const { data } = useGetTourTypesQuery(undefined);
      const [deleteTourType] = useDeleteTourTypeMutation();

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
            <div className="w-full max-w-7xl mx-auto px-5">
                  <div className="flex justify-between my-8">
                        <h1 className="text-xl font-semibold">Tour Types</h1>
                        <AddTourTypeModal />
                  </div>
                  <div className="border border-muted rounded-md">
                        <Table>
                              <TableCaption className="sr-only">A list of all tour types.</TableCaption>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="">Name</TableHead>
                                          <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {data?.data?.map((item) => (
                                          <TableRow key={item._id}>
                                                <TableCell className="font-medium">{item.name}</TableCell>
                                                <TableCell className="text-right">
                                                      <DeleteConfirmation onConfirm={() => handleDeleteTourType(item._id)}>
                                                            <Button size="sm" className="cursor-pointer"><Trash2 /></Button>
                                                      </DeleteConfirmation>
                                                </TableCell>
                                          </TableRow>))}
                              </TableBody>
                        </Table>
                  </div>
            </div>
      )
}

export default AddTourType