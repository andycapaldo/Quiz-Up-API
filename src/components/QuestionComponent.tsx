import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';
import { Button } from 'react-bootstrap';
import UserType from '../types/auth';


type QuestionProps = {  
    question: Partial<QuestionType>,
    currentUser: UserType|null
}


export default function QuestionComponent({ question, currentUser }: QuestionProps) {

  const [showAnswer, setShowAnswer] = useState(false);

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
    <Button variant='danger'>Delete Question</Button>
    </>}
    </>
  )
}