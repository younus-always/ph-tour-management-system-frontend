import { useLocation } from "react-router"

const About = () => {
      const location = useLocation();
      console.log(location);
      return (
            <div>About</div>
      )
}

export default About