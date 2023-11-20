import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import UserType from '../types/auth';
import { deleteQuestion } from '../lib/apiWrapper';


type QuestionProps = {  
    question: Partial<QuestionType>,
    currentUser: Partial<UserType>|null
}


export default function QuestionComponent({ question, currentUser }: QuestionProps) {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setShowDeleteForm(false);
  };

  const handleConfirmDelete = async () => {
    if (!currentUser || !question || question.id === undefined) return;

    const token = localStorage.getItem('token') || '';
    const questionId = question.id as number;

    const response = await deleteQuestion(token, questionId);
    if (response.error){
      console.error('Error deleting question:', response.error);
      handleCloseDeleteForm();
    } else if (response.data) {
      console.log('Question deleted successfully');
      handleCloseDeleteForm();
    }

};

  if(!question){
    return <p>No question available</p>;
  }

  return (
    <>
    <Card border="warning" style={{ width: '18rem' }} className='mt-5'>
        <Card.Header>Question # { question.id }</Card.Header>
            <Card.Body>
                <Card.Title> By { question.author }</Card.Title>
                    <Card.Text>
                        {question.question}
                    </Card.Text>
                    {showAnswer && <Card.Text>{question.answer}</Card.Text>}
                    <Button  variant={showAnswer ? 'danger' : 'primary'}onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Button>
            </Card.Body>
    </Card>
    {question.author === `${currentUser?.first_name} ${currentUser?.last_name}_0${currentUser?.user_id}` &&
    <>
    <Button variant='success'>Edit Question</Button>
    <Button variant='danger' onClick={handleDeleteClick}>Delete Question</Button>
    </>
    }
    {showDeleteForm && 
                <Modal show={showDeleteForm} onHide={handleCloseDeleteForm} className='deleteModal'>
                <Modal.Header closeButton className='deleteModalText'>
                    <Modal.Title>Delete Question #{question.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='deleteModalText'>
                    Are you sure you want to delete this question? This action cannot be undone!
                </Modal.Body>
                <Modal.Footer className='deleteModalText'>
                    <Button variant='danger' className='mt-3 w-50' onClick={handleConfirmDelete}>
                        Delete Question
                    </Button>
                    <Button variant='warning' className='mt-3 w-50' onClick={handleCloseDeleteForm}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        }
        </>
    );
}