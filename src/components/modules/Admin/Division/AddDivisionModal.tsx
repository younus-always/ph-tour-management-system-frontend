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
import SingleImageUploader from "@/components/ui/singleImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";


const AddDivisionModal = () => {
  const [addDivision, isLoading] = useAddDivisionMutation();
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Division Creating...")
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", image as File);

      const res = await addDivision(formData).unwrap();
      toast.dismiss(toastId);  // stop loading toast

      if (res.success) {
        form.reset()
        toast.success("Division Added");
        setOpen(false)
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      const errMsg = err.data.message || "Something went wrong";
      toast.error(errMsg);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="add-division" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-0.5">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Division Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-0.5">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write description here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-division" disabled={!image} className="cursor-pointer">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export default AddDivisionModal