import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from './components/Header'
import QuestionsView from './views/QuestionsView';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import SignUp from "./views/SignUp";
import Login from "./views/Login";

import UserType from "./types/auth";


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)

  const logUserIn = (user:Partial<UserType>):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
  }

  const logUserOut = ():void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
  }
  return (
    <>
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogOut={logUserOut}></Header>
      <Container className='d-flex justify-content-center mt-5'>
        <Row>
          <Col>
            <Routes>
              <Route path='/'></Route>
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

