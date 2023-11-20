import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { editProfile } from '../lib/apiWrapper';
import UserType from '../types/auth';
import CategoryType from '../types/category';


type ProfileEditFormProps = {
    currentUser: Partial<UserType> | null;
    flashMessage: (message: string, category: CategoryType) => void;
    handleCloseForm: () => void;
};

export default function ProfileEditForm({ currentUser, flashMessage, handleCloseForm }: ProfileEditFormProps) {
    const [profileToEdit, setProfileToEdit] = useState<Partial<UserType> | null>(currentUser);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setProfileToEdit({ ...profileToEdit!, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await editProfile(token, profileToEdit as UserType);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${currentUser?.first_name}'s Profile has been edited`, 'success');
            handleCloseForm();
        }
    };

    return (
        <>
            <h1 className='text-center'>Edit {profileToEdit?.last_name}'s Profile</h1>
            {profileToEdit && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Edit Profile</Form.Label>
                            <Form.Control
                                name='email'
                                value={profileToEdit.email}
                                onChange={handleInputChange}
                            />
                            <Button variant='success' className='mt-3 w-50' type='submit'>
                                Edit Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </>
    );
}
