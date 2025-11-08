import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTourTypeMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
      const { data } = useGetTourTypesQuery(undefined);
      const [deleteTourType] = useDeleteTourTypeMutation();
      console.log(data);

      const handleDelete = async (id: string) => {
            try {
                  const res = await deleteTourType(id).unwrap();
                  console.log(res);
                  if (res.success) toast.success("Tour Type Deleted")
            } catch (err: any) {
                  console.log(err);
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
                                                      <Button onClick={() => handleDelete(item._id)} type="button" size={"sm"} className="cursor-pointer"><Trash2 /></Button>
                                                </TableCell>
                                          </TableRow>))}
                              </TableBody>
                        </Table>
                  </div>
            </div>
      )
}

export default AddTourType