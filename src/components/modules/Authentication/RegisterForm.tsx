import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
      Field,
      FieldDescription,
      FieldGroup,
      FieldLabel,
      FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

const RegisterForm = ({
      className,
      ...props
}: React.ComponentProps<"form">) => {
      return (
            <form className={cn("flex flex-col gap-6", className)} {...props}>
                  <FieldGroup>
                        <div className="flex flex-col items-center gap-1 text-center">
                              <h1 className="text-2xl font-bold">Login to your account</h1>
                              <p className="text-muted-foreground text-sm text-balance">
                                    Enter your email below to login to your account
                              </p>
                        </div>
                        <Field>
                              <FieldLabel htmlFor="email">Email</FieldLabel>
                              <Input id="email" type="email" placeholder="johndoe@example.com" required />
                        </Field>
                        <Field>
                              <FieldLabel htmlFor="password">Password</FieldLabel>
                              <Input id="password" type="password" placeholder="********" required />
                        </Field>
                        <Field>
                              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                              <Input id="confirmPassword" type="password" placeholder="********" required />
                        </Field>
                        <Field>
                              <Button type="submit">Register</Button>
                        </Field>
                        <FieldSeparator>Or continue with</FieldSeparator>
                        <Field>
                              <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" aria-hidden="true" focusable="false">
                                          <path fill="#4285F4" d="M24 9.5c3.9 0 7 1.5 9.2 3.6l6.9-6.9C36.9 3.1 30.9 1 24 1 14 1 5.7 6.6 2.8 14.9l7.8 6C12.2 16 17.5 9.5 24 9.5z" />
                                          <path fill="#34A853" d="M46.5 24.1c0-1.6-.1-2.8-.4-4H24v8.1h12.7c-.5 2.9-2.1 5.3-4.6 6.9l7 5.4C43 36.6 46.5 30.8 46.5 24.1z" />
                                          <path fill="#FBBC05" d="M10.1 29.9A14.6 14.6 0 0 1 9.4 24c0-1.6.3-3.1.8-4.5L4 14.6C1.8 18.6.5 21.9.5 24c0 3.9 1 7.6 2.8 10.9l6.8-5z" />
                                          <path fill="#EA4335" d="M24 46.5c6.9 0 12.9-2.3 17.2-6.2l-7-5.4c-2 1.3-4.8 2.1-10.2 2.1-6.5 0-11.9-4.7-13.9-10.8L2.8 34.9C5.7 42.2 14 46.5 24 46.5z" />
                                    </svg>
                                    Login with Google
                              </Button>
                              <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline underline-offset-4">
                                          Sign in
                                    </Link>
                              </FieldDescription>
                        </Field>
                  </FieldGroup>
            </form>
      )
}

export default RegisterForm