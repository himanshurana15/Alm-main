

// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./Auth/pages/Login";
import UserManagement from "./User/UserMangement";
// import Expo from "./Auth/components/expo";
import ForgetPass from "./Auth/components/ForgetPassword";
import EmailVerification from './Auth/components/EmailVerification';
import ResetPassword from './Auth/components/ResetPassword'
import LandingPage from "./DashBoard/LandingPage";
import AdminAccountCreate from "./User/AdminAccoutCreate";
import InviteUser from "./User/InviteUser";
import EditUser from "./User/EditUser";

function App() {
  return (
    <>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/forgetpassword" element={<ForgetPass />} />
          <Route path="/Resetpassword" element={<ResetPassword />} />
          <Route path="/emailverify" element={<EmailVerification />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/adminaccountcreate" element={<AdminAccountCreate />} />
          <Route path="/inviteuser" element={<InviteUser />} />
          <Route path="/edituser" element={<EditUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
