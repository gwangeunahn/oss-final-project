import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Search from './components/Pages/SearchJob';
import ServiceInfo from './components/Pages/ServiceInfo';
import Graduation from './components/Pages/Graduation';
import MyInfo from './components/Pages/MyInfo';
import Login from './components/Pages/Login';
import Signup from './components/Pages/UserCRUD/Signup';
import User from './components/Layout/User';
import UpdateInfo from './components/Pages/UserCRUD/UpdateInfo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route path="/" element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path="/serviceInfo" element={<ServiceInfo/>} />
          <Route path="/graduation" element={<Graduation/>} />
          <Route path="/myInfo" element={<MyInfo/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Route>
        <Route path="/user" element={<User/>} >
          <Route path=":id" element={<Home />} />
          <Route path='search/:id' element={<Search />} />
          <Route path="serviceInfo/:id" element={<ServiceInfo/>} />
          <Route path="graduation/:id" element={<Graduation/>} />
          <Route path="myInfo/:id" element={<MyInfo/>} />
          <Route path="updateInfo/:id" element={<UpdateInfo/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
