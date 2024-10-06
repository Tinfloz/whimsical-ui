import LoginPage from "./pages/LoginPage";
import Splash from "./pages/Splash";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "sonner";
import NavigationBar from "./components/nav/NavigationBar";

function App() {

  return (
    <>
      <Router>
        <Toaster/>
        <NavigationBar>
          <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/splash" element={<Splash/>}/>
          </Routes>
        </NavigationBar>
      </Router>
    </>
  )
}

export default App
