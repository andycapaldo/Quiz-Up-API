import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from './components/Header'
import QuestionsView from './views/QuestionsView';
import Container from 'react-bootstrap/Container';
import { Alert, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Home from "./components/Home";
import AlertMessage from "./components/AlertMessage";

import UserType from "./types/auth";
import CategoryType from "./types/category";


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  const logUserIn = (user:Partial<UserType>):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    flashMessage(`${user.firstName} has been logged in`, 'success');
  }

  const logUserOut = ():void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
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
              <Route path='/' element={<Home/>}></Route>
              <Route path='/questions' element={<QuestionsView />}></Route>
              <Route path='/signup' element={<SignUp logUserIn={logUserIn} />}></Route>
              <Route path='/signin' element={<Login logUserIn={logUserIn} isLoggedIn={isLoggedIn} />}></Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
    </>
  )
}

