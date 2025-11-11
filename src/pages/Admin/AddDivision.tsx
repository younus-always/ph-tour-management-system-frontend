import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
import { DeleteConfirmation } from "@/components/modules/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/features/division/division.api"
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash2 } from "lucide-react"


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
        {data?.data.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-10 text-center space-y-4 border border-dashed rounded-lg bg-muted/20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="Empty State"
              className="w-24 h-24 opacity-80"
            />
            <h2 className="text-xl font-semibold text-foreground">
              No Division Created Yet
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              You haven’t added any divisions yet. Start by creating one to organize your tours.
            </p>
            <AddDivisionModal />
          </div>
        )
          : (<Table>
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
                    {/* <DivisionDropdown division={item} onConfirm={() => handleDeleteDivision(item._id)} /> */}

                    {/* Action Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" type="button" variant="outline" className="cursor-pointer">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <button className="w-full text-start cursor-pointer">View Detail</button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <button
                              className="w-full flex items-center justify-between cursor-pointer">
                              Edit <Pencil color="orange" />
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
                              <button onClick={(e) => e.stopPropagation()}
                                className="w-full flex items-center justify-between cursor-pointer">
                                Delete <Trash2 color="red" />
                              </button>
                            </DeleteConfirmation>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>


                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>)}
      </div>
    </div>
  )
}

export default AddDivision