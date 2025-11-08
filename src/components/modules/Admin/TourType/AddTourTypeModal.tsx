import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddTourTypeModal() {
  const [addTourType] = useAddTourTypeMutation();
  const form = useForm();

  const onSubmit = async (data: { name: string }) => {
    try {
      const res = await addTourType(data).unwrap();
      console.log(res);
      if (res.success) toast.success("Tour Type Added")
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message)
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1">Tour Type Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Tour Type Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-tour-type" className="cursor-pointer">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
