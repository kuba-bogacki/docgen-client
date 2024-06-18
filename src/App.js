import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SendInvitation from "./pages/user_panel/send_invitation/SendInvitation";
import ChangePassword from "./pages/change_password/ChangePassword";
import CurrentCompany from "./pages/user_panel/current_company/CurrentCompany";
import ResetPassword from "./pages/reset_password/ResetPassword";
import JoinToCompany from "./pages/user_panel/join_to_company/JoinToCompany";
import CompanyFiles from "./pages/user_panel/company_files/CompanyFiles";
import MyCompanies from "./pages/user_panel/my_companies/MyCompanies";
import CreateEvent from "./pages/user_panel/create_event/CreateEvent";
import UserProfile from "./pages/user_profile/UserProfile";
import AddCompany from "./pages/user_panel/add_company/AddCompany";
import UserPanel from "./pages/user_panel/UserPanel";
import HomePage from "./pages/home_page/HomePage";
import Members from "./pages/user_panel/members/Members";
import Statute from "./pages/statute/Statute";
import SignIn from "./pages/sign_in/SignIn";
import SignUp from "./pages/sign_up/SignUp";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Faq from "./pages/faq/Faq";
import CookieService from "./services/cookieService";
import {StompSessionProvider} from "react-stomp-hooks";

function App() {

  return (
    <div className="app-container">
      <StompSessionProvider url="http://localhost:8080/v1.0/notification/websocket" connectHeaders={CookieService.getCookie()}>
        <Router>
          <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="sign-in" element={<SignIn/>}></Route>
              <Route path="sign-up" element={<SignUp/>}></Route>
              <Route path="reset-password" element={<ResetPassword/>}></Route>
              <Route path="change-password" element={<ChangePassword/>}></Route>
              <Route path="statute" element={<Statute/>}></Route>
              <Route path="frequently-asked-questions" element={<Faq/>}></Route>
              <Route path="user-profile" element={<UserProfile/>}></Route>
              <Route path="user-panel" element={<UserPanel/>}>
                {/*<Route path="join-to-company" element={CookieService.isLogIn() ? <JoinToCompany/> : <Navigate to="/sign-in"/>}></Route>*/}
                <Route path="join-to-company" element={<JoinToCompany/>}></Route>
                <Route path="add-company" element={<AddCompany/>}></Route>
                <Route index element={<MyCompanies/>}></Route>
                <Route path="my-companies" element={<MyCompanies/>}></Route>
                <Route path=":companyId" element={<CurrentCompany/>}></Route>
                <Route path="company-files" element={<CompanyFiles/>}></Route>
                <Route path="send-invitation" element={<SendInvitation/>}></Route>
                <Route path="members" element={<Members/>}></Route>
                <Route path="create-event" element={<CreateEvent/>}></Route>
              </Route>
            </Routes>
          <Footer/>
        </Router>
      </StompSessionProvider>
    </div>
  );
}

export default App;