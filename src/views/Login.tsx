import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';


type LoginProps = {
    logUserIn: (user:Partial<UserType>) => void,
    isLoggedIn: boolean
}


export default function Login({ logUserIn, isLoggedIn}: LoginProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({email:'', password:''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        logUserIn(userFormData);
        navigate('/');
    }

  return (
    <>
        <h1 className="text-center">Log In</h1>
        <Card className='mt-3'>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control value={userFormData.email} name='email' onChange={handleInputChange} />

                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} />

                    <Button type='submit' variant='outline-success' className='w-100 mt-3'>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}