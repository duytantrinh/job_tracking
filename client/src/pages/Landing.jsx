import Wrapper from "../assets/wrappers/LandingPage"
// import styled component from outside
import main from "../assets/images/main1.svg"

import {Link} from "react-router-dom"
import {Logo} from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            eius facere, quam vitae consectetur, sint exercitationem aperiam
            dolorem illum maxime esse impedit in obcaecati praesentium placeat
            nemo soluta vero accusamus.
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>

        <img src={main} alt="job tracking" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
