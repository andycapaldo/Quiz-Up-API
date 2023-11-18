import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';
import { createNewUser, login } from '../lib/apiWrapper';
import CategoryType from '../types/category';

type SignUpProps = {
    logUserIn: (user:Partial<UserType>) => void,
    flashMessage: (message:string, category:CategoryType) => void
}


export default function SignUp({ logUserIn, flashMessage }: SignUpProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>(
        {
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const response = await createNewUser(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const newUserTokenResponse = await login(userFormData.email!, userFormData.password!)
            const newUser = newUserTokenResponse.data!
            localStorage.setItem('token', newUserTokenResponse.data?.token!)
            localStorage.setItem('user', JSON.stringify(newUserTokenResponse.data!))
            logUserIn(newUser);
            navigate('/');
        }
    }

    const validatePassword = (password:string):boolean => {
        return password.length >= 5
    }

    const validatedForm = validatePassword(userFormData.password!)
  return (
    <>
                <h1 className="text-center">Sign Up</h1>
            <Card className='mt-3'>
                <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor='first_name'>First Name</Form.Label>
                    <Form.Control value={userFormData.first_name} name='first_name' onChange={handleInputChange} />

                    <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                    <Form.Control value={userFormData.last_name} name='last_name' onChange={handleInputChange} />

                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control value={userFormData.email} name='email' type='email' onChange={handleInputChange} />

                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} />

                    <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={!validatedForm}>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}