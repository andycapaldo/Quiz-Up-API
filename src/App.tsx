import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from './components/Header'
import QuestionsView from './views/QuestionsView';
import Profile from "./views/Profile";
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Home from "./views/Home";
import AlertMessage from "./components/AlertMessage";

import UserType from "./types/auth";
import CategoryType from "./types/category";
import ProfileForm from "./components/ProfileEditForm";



export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true: false);
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);


  useEffect( () => {
    async function getLoggedInUser(){
      if (isLoggedIn){
          const user = JSON.parse(localStorage.getItem('user')|| '')
          if(user){
            setLoggedInUser(user)
          } else {
            logUserOut()
          }
      }
    }

    getLoggedInUser();
  }, [isLoggedIn])

  const logUserIn = (user:Partial<UserType>):void => {
    if (localStorage.getItem('token') === "undefined") {
      flashMessage(`Invalid email or password`, 'danger')
    } else {
      setIsLoggedIn(true);
      setLoggedInUser(user);
      flashMessage(`Welcome ${user.first_name}!`, 'success');
    }
  }

  const logUserOut = ():void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    flashMessage('You have logged out', 'light');
  }

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
      setMessage(newMessage);
      setCategory(newCategory);
  }
  return (
    <>
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogOut={logUserOut}></Header>
      <Container className='d-flex justify-content-center mt-5'>
        <Row>
          <Col>
          {message && category && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
            <Routes>
              <Route path='/' element={<Home loggedInUser={loggedInUser}/>}></Route>
              <Route path='/questions' element={<QuestionsView isLoggedIn={isLoggedIn} flashMessage={flashMessage} />}></Route>
              <Route path='/signup' element={<SignUp logUserIn={logUserIn} flashMessage={flashMessage} />}></Route>
              <Route path='/signin' element={<Login logUserIn={logUserIn} isLoggedIn={isLoggedIn} flashMessage={flashMessage} />}></Route>
              <Route path='/profile' element={<Profile loggedInUser={loggedInUser} flashMessage={flashMessage} />}></Route>
            </Routes>
          </Col>
        </Row>
      </Container>
      
    </BrowserRouter>
    </>
  )
}

