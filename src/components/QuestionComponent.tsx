import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';
import { Button } from 'react-bootstrap';


type QuestionProps = {  
    question?: Partial<QuestionType>
}


export default function QuestionComponent({ question }: QuestionProps) {

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
    </>
  )
}