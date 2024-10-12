import LoginPage from "./pages/LoginPage";
import Splash from "./pages/Splash";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "sonner";
import NavigationBar from "./components/nav/NavigationBar";
import CreatePainting from "./pages/CreatePainting";
import CreateUser from "./pages/CreateUser";
import GetAllUsers from "./pages/GetAllUsers";

function App() {

  return (
    <>
      <Router>
        <Toaster/>
        <NavigationBar>
          <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/splash" element={<Splash/>}/>
              <Route path="/create/painting" element={<CreatePainting/>}/>
              <Route path="/create/user" element={<CreateUser/>}/>
              <Route path="/get/users" element={<GetAllUsers/>}/>
          </Routes>
        </NavigationBar>
      </Router>
    </>
  )
}

export default App
