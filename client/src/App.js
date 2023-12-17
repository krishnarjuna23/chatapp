import React,{useState,createContext} from 'react'
import { BrowserRouter,Route} from 'react-router-dom'
import {Routes} from 'react-router'
import Nav from './Nav'
import Register from './Register'
import Login from './Login'
import Myprofile from './Myprofile'
import Footer from './Footer';
import Home from './home';
import About from './About'


export const store = createContext();

const App = () => {
  const[token,setToken]=useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      <Nav />
      
      <Routes>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/Home' element={<Home/>}/>
     <Route path='/About' element={<About/>}/>
     <Route path='/myprofile' element={<Myprofile/>}/>
     </Routes>
  
      </BrowserRouter>
      </store.Provider>
      <Footer />
    </div>
  )
}

export default App
