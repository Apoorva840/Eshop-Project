import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';
import App from './App';


function Home() {
    return(
    <BrowserRouter>
              <Routes>
              <Route path="/" element={<App />} />
              <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />

              </Routes>
            </BrowserRouter>
    );
}

export default Home;

