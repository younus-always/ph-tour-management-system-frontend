import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { Link, useSearchParams } from "react-router";
import TourFilters from "@/components/modules/Tours/TourFilters";

export default function Tours() {
      const [searchParams] = useSearchParams();
      const division = searchParams.get("division") || undefined;
      const tourType = searchParams.get("tourType") || undefined;
      const { data } = useGetAllToursQuery({ division, tourType });

      console.log(data);

      return (
            <div className="container mx-auto px-5 py-8 grid md:grid-cols-10 lg:grid-cols-12 gap-5">
                  <TourFilters />
                  <div className="w-full md:col-span-7 lg:col-span-9">
                        {data?.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                    <img
                                          src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                                          alt="No Tours"
                                          className="w-32 h-32 opacity-80"
                                    />
                                    <h2 className="text-2xl font-semibold text-foreground">No Tours Available</h2>
                                    <p className="text-muted-foreground max-w-md">
                                          It looks like there are no tours available at the moment. Please check back
                                          later or explore other destinations!
                                    </p>
                                    <Button
                                          onClick={() => window.location.reload()}
                                          variant="outline"
                                          className="flex items-center gap-2 mt-4 cursor-pointer"
                                    >
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M4 4v5h.582m15.356 2A9 9 0 116.582 9"
                                                />
                                          </svg>
                                          Try Again
                                    </Button>
                              </div>
                        )
                              : data?.map((item) => (
                                    <div
                                          key={item.slug}
                                          className="w-full flex flex-col lg:flex-row border border-muted rounded-lg shadow-md overflow-hidden mb-6"
                                    >
                                          <div className="w-full sm:w-2/5 shrink-0">
                                                <img
                                                      src={item.images[0]}
                                                      alt={item.title}
                                                      className="object-cover w-full h-full"
                                                />
                                          </div>
                                          <div className="p-6 flex-1">
                                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                                <p className="text-muted-foreground mb-3">{item.description}</p>

                                                <div className="flex items-center justify-between mb-3">
                                                      <span className="text-xl font-bold text-primary">
                                                            From ৳{item.costFrom.toLocaleString()}
                                                      </span>
                                                      <span className="text-sm text-muted-foreground">
                                                            Max {item.maxGuest} guests
                                                      </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                                      <div>
                                                            <span className="font-medium">From:</span>{" "}
                                                            {item.departureLocation}
                                                      </div>
                                                      <div>
                                                            <span className="font-medium">To:</span>{" "}
                                                            {item.arrivalLocation}
                                                      </div>
                                                      <div>
                                                            <span className="font-medium">Duration:</span>{" "}
                                                            {item.tourPlan.length} days
                                                      </div>
                                                      <div>
                                                            <span className="font-medium">Min Age:</span> {item.minAge}+
                                                      </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                      {item.amenities.slice(0, 3).map((amenity: string, index: number) => (
                                                            <span
                                                                  key={index}
                                                                  className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                                                            >
                                                                  {amenity}
                                                            </span>
                                                      ))}
                                                      {item.amenities.length > 3 && (
                                                            <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                                                                  +{item.amenities.length - 3} more
                                                            </span>
                                                      )}
                                                </div>

                                                <Button asChild className="w-full">
                                                      <Link to={`/tours/${item.slug}`}>View Details</Link>
                                                </Button>
                                          </div>
                                    </div>
                              ))}
                  </div>
            </div>
      );
}
