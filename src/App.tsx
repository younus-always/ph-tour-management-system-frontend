import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"
import { generateRoutes } from "./utils/generateRoutes";
import { userSidebarItems } from "./routes/userSidebarItems";

const App = () => {

  console.log(generateRoutes(userSidebarItems));

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  )
}

export default App