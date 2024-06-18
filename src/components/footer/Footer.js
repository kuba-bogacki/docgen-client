import "./FooterStyle.css";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import style from "../../constans/overwriteMaterialUiStyle";

function Footer() {

  return (
    <footer className="footer-container">
      <hr className="footer-hr-line"></hr>
      <div className="info-section">
        <div className="info-section-block">
          <h2>Contact:</h2>
          <p>E-mail : <a href="/#">naspolke.organizacja@gmail.com</a></p>
          <p>Phone : <a href="/#">+ 48 510 330 651</a></p>
          <p>Fax : <a href="/#">+ 22 119 53 23 39</a></p>
          <p>Address : Ronald Regan Avenue 6, San Francisco, LA 94107</p>
        </div><hr/>
        <div className="info-section-block">
          <h2>Links:</h2>
          <p><a href="/statute">Statute</a></p>
          <p><a href="/frequently-asked-questions">FAQ</a></p>
        </div><hr/>
        <div className="info-section-block">
          <h2>Follow us:</h2>
          <div className="social-media-icons">
            <a href={"https://twitter.com/"} target="_blank" rel="noreferrer"><TwitterIcon sx={style.twitterIconStyle}/></a>
            <p>Twitter</p>
          </div>
          <div className="social-media-icons">
            <a href={"https://pl-pl.facebook.com/"} target="_blank" rel="noreferrer"><FacebookIcon sx={style.facebookIconStyle}/></a>
            <p>Facebook</p>
          </div>
          <div className="social-media-icons">
            <a href={"https://www.instagram.com/"} target="_blank" rel="noreferrer"><InstagramIcon sx={style.instagramIconStyle}/></a>
            <p>Instagram</p>
          </div>
        </div>
      </div>
      <hr className="footer-hr-line"></hr>
      <div className="footer-rights">
        <p>© 2023 Kosicki & Bogacki. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;