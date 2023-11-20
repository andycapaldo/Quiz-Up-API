import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import UserType from '../types/auth';
import CategoryType from '../types/category';
import { deleteQuestion, editQuestion } from '../lib/apiWrapper';
import Form from 'react-bootstrap/Form';


type QuestionProps = {  
    question: Partial<QuestionType>|null,
    currentUser: Partial<UserType>|null,
    flashMessage: (message: string, category: CategoryType) => void;
}


export default function QuestionComponent({ question, currentUser, flashMessage }: QuestionProps) {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Partial<QuestionType>|null>({answer: question?.answer});
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setShowDeleteForm(false);
  };

  const handleEditClick = () => {
    setShowEditForm(true);
  };
  
  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuestionToEdit({...questionToEdit!, [e.target.name]: e.target.value});
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    const questionId = question!.id as number;

    const response = await editQuestion(token, questionId, questionToEdit as QuestionType);
    if(response.error) {
      console.warn(response.error)
    } else {
      flashMessage(`Question # ${question?.id} has been edited!`, 'success')
      handleCloseEditForm();
    }
  }

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
    <Button variant='success' onClick={handleEditClick}>Edit Question</Button>
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
      {showEditForm && 
                <Modal show={showEditForm} onHide={handleCloseEditForm} className='deleteModal'>
                <Modal.Header closeButton className='deleteModalText'>
                    <Modal.Title>Edit Question #{question.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='deleteModalText'>
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Control name='answer' value={questionToEdit?.answer} onChange={handleInputChange}/>
                      <Button variant='success' className='mt-3 w-50' onClick={handleFormSubmit}>
                        Save Edits
                    </Button>
                    <Button variant='info' className='mt-3 w-50' onClick={handleCloseEditForm}>
                        Cancel
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='deleteModalText'>
                </Modal.Footer>
            </Modal>
        }
        </>
    );
}