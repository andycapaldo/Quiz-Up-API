import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import UserType from '../types/auth';
import CategoryType from '../types/category';
import ProfileEditForm from '../components/ProfileEditForm';
import ProfileDeleteForm from '../components/ProfileDeleteForm';

type ProfileProps = {
    loggedInUser: Partial<UserType> | null;
    flashMessage: (message: string, category: CategoryType) => void;
};

export default function Profile({ loggedInUser, flashMessage }: ProfileProps) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const handleEditClick = () => {
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteForm(true);
    };

    const handleCloseDeleteForm = () => {
        setShowDeleteForm(false);
    };


    return (
        <>
            {loggedInUser && <h1>{loggedInUser.first_name}'s Profile</h1>}
            <Card>
            <Card.Body>
                <Card.Text>First Name: {loggedInUser?.first_name}</Card.Text>
                <Card.Text>Last Name: {loggedInUser?.last_name}</Card.Text>
                <Card.Text>Email: {loggedInUser?.email}</Card.Text>
                <Card.Text>Questions: 0</Card.Text>
            </Card.Body>
        </Card>
            <Button variant='success' onClick={handleEditClick}>
                Edit Profile
            </Button>
            <Button variant='danger' onClick={handleDeleteClick}>
                Delete Profile
            </Button>

            {showEditForm && (
                <ProfileEditForm
                    currentUser={loggedInUser}
                    flashMessage={flashMessage}
                    handleCloseForm={handleCloseEditForm}
                />
            )}

            {showDeleteForm && (
                <ProfileDeleteForm
                    currentUser={loggedInUser}
                    flashMessage={flashMessage}
                    handleCloseForm={handleCloseDeleteForm}
                />
            )}
        </>
    );
}
