import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
import { DeleteConfirmation } from "@/components/modules/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/features/division/division.api"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";


const AddDivision = () => {
  const { data } = useGetDivisionsQuery(undefined);
  const [deleteDivision] = useDeleteDivisionMutation();

  const handleDeleteDivision = async (id: string) => {
    const toastId = toast.loading("Deleting...")
    try {
      const res = await deleteDivision(id).unwrap();
  
      toast.dismiss(toastId);
      if (res.success) toast.success("Division Deleted")
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.data.message)
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">All Division</h1>
        <AddDivisionModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableCaption className="sr-only">A list of all tour types.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Photo</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  <img src={item.thumbnail} alt={item.name + "photo"} className="w-10 h-10 rounded-lg object-cover object-center" />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="font-medium">{item.description.length > 50 ? item.description.slice(0, 50) + "..." : item.description}</TableCell>
                <TableCell className="text-right">
                  <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
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

export default AddDivision