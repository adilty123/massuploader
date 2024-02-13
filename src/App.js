import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './Pages/home';
import RegisterForm from './Pages/registerForm';
import LoginForm from './Pages/loginForm';
import UploadForm from './Pages/uploadForm';
import {useState} from 'react';
import AccountsForm from './Pages/accountsForm';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home email = {email} loggedIn = {loggedIn} setLoggedIn={setLoggedIn}/>}></Route>
          <Route path = "/loginForm" element = {<LoginForm setEmail = {setEmail} setLoggedIn = {setLoggedIn}/>}></Route>
          <Route path = "/registerForm" element = {<RegisterForm setEmail = {setEmail} setLoggedIn = {setLoggedIn}/>}></Route>
          <Route path = "/uploadForm" element={<UploadForm email = {email} loggedIn = {loggedIn}/>}/>
          <Route path = "/accountsForm" element={<AccountsForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
