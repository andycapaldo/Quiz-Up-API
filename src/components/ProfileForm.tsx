import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CategoryType from '../types/category';
import UserType from '../types/auth';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../lib/apiWrapper';

type ProfileFormProps = {
    currentUser: UserType|null,
    flashMessage: (message: string, category: CategoryType) => void
}


export default function ProfileForm({ currentUser, flashMessage }: ProfileFormProps) {
    const navigate = useNavigate();

    const [profileToEdit, setProfileToEdit] = useState<UserType|null>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setProfileToEdit({...profileToEdit!, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editProfile(token, profileToEdit!);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${currentUser?.first_name}'s Profile has been edited`, 'success');
            navigate('/profile')
        }
    }

  return (
    <>
        <h1 className="text-center">Edit {profileToEdit?.first_name}'s Profile</h1>
            {profileToEdit && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Edit Profile</Form.Label>
                            <Form.Control name='title' value={profileToEdit.email} onChange={handleInputChange} />
                            <Button variant='success' className='mt-3 w-50' type='submit'>Edit Profile</Button>
                            <Button variant='danger' className='mt-3 w-50' onClick={handleShow}>Delete Profile</Button>
                        </Form>
                    </Card.Body>
                </Card>
                )
            }
    </>)}
