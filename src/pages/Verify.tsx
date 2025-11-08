import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import formatResendOtpTime from "@/utils/formatTime";


const formSchema = z.object({
      pin: z.string().min(6, {
            error: "Your one-time password must be 6 characters."
      })
});

const Verify = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const [email] = useState(location.state);
      const [confirmed, setConfirmed] = useState(false);
      const [timer, setTimer] = useState(120);
      const [sendOtp] = useSendOtpMutation();
      const [verifyOtp] = useVerifyOtpMutation();

      // redirect to "/" if email = false
      useEffect(() => {
            if (!email) {
                  navigate("/");
            }
      }, [email]);

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  pin: "",
            }
      });

      useEffect(() => {
            if (!email && !confirmed) return;

            const timerId = setInterval(() => {
                  setTimer((prev) => prev > 0 ? prev - 1 : 0)
            }, 1000);
            return () => clearInterval(timerId);
      }, [email, confirmed])

      // send otp to the gmail
      const handleSendOtp = async () => {
            const toastId = toast.loading("Sending OTP...")
            try {
                  const res = await sendOtp({ email }).unwrap();
                  console.log(res);
                  toast.dismiss(toastId);  // stop loading toast

                  if (res.success) {
                        toast.success(res.message)
                        setConfirmed(true)
                        setTimer(120)
                  } else {
                        toast.error(res.message);
                  }
            } catch (err: any) {
                  toast.dismiss(toastId);
                  const errMsg = err?.data?.message || "Failed to send OTP";
                  toast.error(errMsg);
            }
      };

      // verify otp
      const onSubmit = async (data: z.infer<typeof formSchema>) => {
            const toastId = toast.loading("Verifying OTP")
            try {
                  console.log(data);
                  const payload = {
                        email,
                        otp: data.pin
                  }
                  const res = await verifyOtp(payload).unwrap();
                  console.log(res);
                  if (res.success) {
                        toast.success(res.message, { id: toastId });
                        navigate("/login")
                  } else {
                        toast.error("Verification failed", { id: toastId });
                  }
            } catch (err: any) {
                  console.log(err);
                  const errMsg = err?.data?.message || "Something went wrong";
                  toast.error(errMsg, { id: toastId })
            }
      };

      return (
            <div className="grid place-content-center h-screen">
                  {confirmed ? (
                        <Card>
                              <CardHeader>
                                    <CardTitle className="text-xl">Verify your email address</CardTitle>
                                    <CardDescription>
                                          Please enter the 6-digit code we sent to <br /> {email}
                                    </CardDescription>
                              </CardHeader>
                              <CardContent>
                                    <Form {...form}>
                                          <form
                                                id="otp-form"
                                                onSubmit={form.handleSubmit(onSubmit)}
                                                className=" space-y-6"
                                          >
                                                <FormField
                                                      control={form.control}
                                                      name="pin"
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>One-Time Password</FormLabel>
                                                                  <FormControl>
                                                                        <InputOTP maxLength={6} {...field}>
                                                                              <InputOTPGroup>
                                                                                    <InputOTPSlot index={0} />
                                                                              </InputOTPGroup>
                                                                              <InputOTPGroup>
                                                                                    <InputOTPSlot index={1} />
                                                                              </InputOTPGroup>
                                                                              <InputOTPGroup>
                                                                                    <InputOTPSlot index={2} />
                                                                              </InputOTPGroup>
                                                                              <Dot />
                                                                              <InputOTPGroup>
                                                                                    <InputOTPSlot index={3} />
                                                                              </InputOTPGroup>
                                                                              <InputOTPGroup>
                                                                                    <InputOTPSlot index={4} />
                                                                              </InputOTPGroup>
                                                                              <InputOTPGroup>
                                                                                    <InputOTPSlot index={5} />
                                                                              </InputOTPGroup>
                                                                        </InputOTP>
                                                                  </FormControl>
                                                                  <FormDescription>
                                                                        <Button
                                                                              onClick={handleSendOtp}
                                                                              type="button"
                                                                              variant="link"
                                                                              disabled={timer !== 0}
                                                                              className={cn("p-0 m-0", {
                                                                                    "cursor-pointer": timer === 0,
                                                                                    "text-gray-500": timer !== 0,
                                                                              })}
                                                                        >
                                                                              Resent OTP:{" "}
                                                                        </Button>{" "}
                                                                        {formatResendOtpTime(timer)}
                                                                  </FormDescription>
                                                                  <FormMessage />
                                                            </FormItem>
                                                      )}
                                                />
                                          </form>
                                    </Form>
                              </CardContent>
                              <CardFooter className="flex justify-end">
                                    <Button form="otp-form" type="submit" className="cursor-pointer">
                                          Submit
                                    </Button>
                              </CardFooter>
                        </Card>
                  ) : (
                        <Card>
                              <CardHeader>
                                    <CardTitle className="text-xl text-center">Verify your email address</CardTitle>
                                    <CardDescription className="text-center">
                                          We will send you an OTP at <br /> 👉 {email}
                                    </CardDescription>
                              </CardHeader>
                              <CardFooter className="flex justify-end">
                                    <Button onClick={handleSendOtp} className="w-[300px] cursor-pointer">
                                          Confirm
                                    </Button>
                              </CardFooter>
                        </Card>
                  )}
            </div>
      )
}

export default Verify