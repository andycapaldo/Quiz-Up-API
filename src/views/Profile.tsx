import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import UserType from '../types/auth';
import QuestionType from '../types/question';
import CategoryType from '../types/category';
import ProfileEditForm from '../components/ProfileEditForm';
import ProfileDeleteForm from '../components/ProfileDeleteForm';
import QuestionComponent from '../components/QuestionComponent';
import { getMyQuestions } from '../lib/apiWrapper';

type ProfileProps = {
    loggedInUser: UserType | null;
    flashMessage: (message: string, category: CategoryType) => void;
};

export default function Profile({ loggedInUser, flashMessage }: ProfileProps) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [userQuestions, setUserQuestions] = useState<QuestionType[]>([]);

    useEffect( () => {
        async function fetchData(){
            const token = localStorage.getItem('token') || '';
            const response = await getMyQuestions(token);
            if (response.data) {
                setUserQuestions(response.data);
            } else if (response.error){
                console.warn(response.error)
            }
        };

        fetchData()
    }, [loggedInUser])

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


    const questionsArray = userQuestions['questions'];
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

            {questionsArray && questionsArray.length > 0 && (
                <>
                    <h1>{loggedInUser?.first_name}'s Questions</h1>
                    {questionsArray.map((question:QuestionType) => (
                    <QuestionComponent key={question.id} question={question} currentUser={loggedInUser}/>
                ))}
                </>
            )}
        </>
    );
}
