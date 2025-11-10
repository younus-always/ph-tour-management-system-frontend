import { Search } from "lucide-react"
import { IoCloseCircle } from "react-icons/io5";
import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"
import { useState } from "react";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [input, setInput] = useState("")

  const handleSearch = (e: { preventDefault: () => void; }) => {
    console.log(e);
    e.preventDefault();
    const value = input.toLowerCase().trim();
    console.log(value);
  };

  const handleRemoveValue = () => setInput("")

  return (
    <form {...props} onSubmit={handleSearch}>
      <SidebarGroup className="py-0 w-64">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            name="search"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search"
            className="pl-8 pr-6"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          {input && <IoCloseCircle type="button" onClick={handleRemoveValue} className="absolute top-1/2 right-1.5 size-4 -translate-y-1/2 opacity-70" />}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
