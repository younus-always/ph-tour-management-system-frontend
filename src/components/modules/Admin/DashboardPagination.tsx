import {
      Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useId, type Dispatch, type SetStateAction, } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IProps {
      currentPage: number;
      limit: number;
      setCurrentPage: Dispatch<SetStateAction<number>>;
      setLimit: Dispatch<SetStateAction<number>>;
      meta: {
            page: number,
            total: number,
            limit: number,
            totalPage: number
      }
}

export default function DashboardPagination({ currentPage, setCurrentPage, limit, setLimit, meta }: IProps) {
      const id = useId();
      const { page, total, limit: metaLimit, totalPage } = meta || {};

      useEffect(() => {
            const newTotalPage = Math.ceil(total / metaLimit);
            if (currentPage > newTotalPage) setCurrentPage(newTotalPage);
      }, [metaLimit, total, currentPage, setCurrentPage])


      return (
            <div className="flex flex-col lg:flex-row items-center gap-3">
                  <div className="w-full flex items-center justify-center gap-3">
                        {/* Results per page */}
                        <div className="flex items-center gap-2">
                              <Label htmlFor={id}>Rows per page</Label>
                              <Select defaultValue="10" onValueChange={(value) => setLimit(Number(value))}>
                                    <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                                          <SelectValue placeholder="10" />
                                    </SelectTrigger>
                                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                                          <SelectItem value="10">10</SelectItem>
                                          <SelectItem value="20">20</SelectItem>
                                          <SelectItem value="30">30</SelectItem>
                                          <SelectItem value="50">50</SelectItem>
                                          <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                              </Select>
                        </div>

                        {/* Page number information */}
                        <p className="text-sm whitespace-nowrap text-muted-foreground" aria-live="polite">
                              <span className="text-foreground">
                                    {(currentPage - 1) * limit + 1}–
                                    {Math.min(currentPage * limit, total)}
                              </span>{" "}
                              of <span className="text-foreground">{total}</span>
                        </p>
                  </div>

                  <Pagination>
                        <PaginationContent>
                              <PaginationItem>
                                    {currentPage === 1
                                          ? <PaginationPrevious className="opacity-50 cursor-not-allowed" />
                                          : <PaginationPrevious onClick={() => setCurrentPage(prev => prev - 1)} className="cursor-pointer" />}
                              </PaginationItem>

                              {/* Dynamic smart pagination */}
                              {
                                    (() => {
                                          const pages: (number | string)[] = []
                                          // --- Case 1: Few pages (no need for ellipsis) ---
                                          if (totalPage <= 5) {
                                                for (let i = 1; i <= totalPage; i++) {
                                                      pages.push(i)
                                                }
                                          }
                                          // --- Case 2: Many pages ---
                                          else {
                                                if (currentPage <= 3) {
                                                      // Start region
                                                      pages.push(1, 2, 3, 4, "…", totalPage)
                                                } else if (currentPage >= totalPage - 2) {
                                                      // End region
                                                      pages.push(1, "…", totalPage - 3, totalPage - 2, totalPage - 1, totalPage)
                                                } else {
                                                      // Middle region
                                                      pages.push(
                                                            1,
                                                            "…",
                                                            currentPage - 1,
                                                            currentPage,
                                                            currentPage + 1,
                                                            "…",
                                                            totalPage
                                                      )
                                                }
                                          }

                                          // --- Render ---
                                          return pages.map((pageNum, idx) =>
                                                pageNum === "…" ? (
                                                      <PaginationItem key={`ellipsis-${idx}`}>
                                                            <PaginationEllipsis />
                                                      </PaginationItem>
                                                ) : (
                                                      <PaginationItem key={pageNum}>
                                                            <PaginationLink
                                                                  isActive={currentPage === pageNum}
                                                                  onClick={() => setCurrentPage(Number(pageNum))}
                                                                  className={`cursor-pointer ${currentPage === pageNum
                                                                        ? "bg-primary text-white hover:bg-primary/90"
                                                                        : ""
                                                                        }`}
                                                            >
                                                                  {pageNum}
                                                            </PaginationLink>
                                                      </PaginationItem>
                                                )
                                          )
                                    })()
                              }
                              <PaginationItem>
                                    {page >= totalPage
                                          ? (
                                                <PaginationNext className="opacity-50 cursor-not-allowed" />
                                          )
                                          : (
                                                <PaginationNext
                                                      onClick={() => setCurrentPage((prev) => prev + 1)}
                                                      className="cursor-pointer"
                                                />
                                          )}
                              </PaginationItem>
                        </PaginationContent>
                  </Pagination>
            </div>
      )
}
