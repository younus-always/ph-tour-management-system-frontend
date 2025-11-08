import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

const Unauthorized = () => {
      return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground">
                  <div className="bg-card shadow-xl border border-border rounded-2xl p-10 max-w-md">
                        <div className="flex flex-col items-center gap-4">
                              <ShieldAlert className="w-16 h-16 text-primary animate-pulse" />
                              <h1 className="text-3xl font-bold">Unauthorized Access</h1>
                              <p className="text-muted-foreground">
                                    You don’t have permission to view this page. Please check your role or go back to the homepage.
                              </p>
                              <Button asChild size="lg" className="mt-4">
                                    <Link to="/">Go to Home</Link>
                              </Button>
                        </div>
                  </div>
            </div>
      )
}

export default Unauthorized
