import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserType from '../types/auth';
import QuestionType from '../types/question';
import ProfileForm from '../components/ProfileForm';

type ProfileProps = {
    loggedInUser: Partial<UserType>|null,
    questions?: QuestionType, 
}



export default function Profile({ loggedInUser }: ProfileProps) {
    

  return (
    <>
    { loggedInUser && <h1>{loggedInUser.first_name}'s Profile</h1>}
        <Card>
            <Card.Body>
                <Card.Text>First Name: {loggedInUser?.first_name}</Card.Text>
                <Card.Text>Last Name: {loggedInUser?.last_name}</Card.Text>
                <Card.Text>Email: {loggedInUser?.email}</Card.Text>
                <Card.Text>Questions: 0</Card.Text>
            </Card.Body>
        </Card>
        <Button variant='success'>Edit Profile</Button>
        <Button variant='danger'>Delete Profile</Button>
    </>
  )
}