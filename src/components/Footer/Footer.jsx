import { React, Component } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './footer.css'

class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div className="social">
            <a
              className="social-github"
              href="https://github.com/JoelSchachtel"
              target="blank"
            >
              <GitHubIcon
                color="secondary"
                fontSize="large"
                className="social-icons"
              />
            </a>
            <a
              className="social-linkedin"
              href="https://www.linkedin.com/in/joel-schachtel-915719223/"
              target="blank"
            >
              <LinkedInIcon
                color="secondary"
                fontSize="large"
                className="social-icons"
              />
            </a>
          </div>

          <div className="copyright">
            © 2022 Copyright
            <a
              href=""
              target="blank"
            >
              {" "}
              Joel Schachtel
            </a>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
