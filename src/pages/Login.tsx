import Logo from "@/assets/icons/logo.png"
import LoginForm from '@/components/modules/Authentication/LoginForm'
import TravelLogin from "@/assets/images/travel-login.jpg"
import { Link } from 'react-router'


const Login = () => {
      return (
            <div className="grid min-h-svh lg:grid-cols-2">
                  <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                              <Link to={'/'}>
                                    <img src={Logo} alt="logo" className="w-12 h-12" />
                              </Link>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                              <div className="w-full max-w-xs">
                                    <LoginForm />
                              </div>
                        </div>
                  </div>
                  <div className="bg-muted relative hidden lg:block">
                        <img
                              src={TravelLogin}
                              alt="Image"
                              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
                        />
                  </div>
            </div>
      )
}

export default Login