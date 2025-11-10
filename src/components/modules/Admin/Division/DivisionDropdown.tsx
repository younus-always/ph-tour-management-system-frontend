import { Button } from "@/components/ui/button"
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuShortcut,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash2 } from "lucide-react"
import { DeleteConfirmation } from "../../DeleteConfirmation"

interface IProps {
      division: any,
      onConfirm: () => void;
}

export default function DivisionDropdown({ division, onConfirm }: IProps) {
      console.log(division._id);
      return (
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
                                    <DeleteConfirmation onConfirm={onConfirm}>
                                          <button onClick={(e) => e.stopPropagation()}
                                                className="w-full flex items-center justify-between cursor-pointer">
                                                Delete <Trash2 color="red" />
                                          </button>
                                    </DeleteConfirmation>
                              </DropdownMenuItem>
                        </DropdownMenuGroup>
                  </DropdownMenuContent>
            </DropdownMenu>
      )
}
