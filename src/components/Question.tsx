import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';


type QuestionProps = {  
    question: QuestionType
}


export default function Question({ question }: QuestionProps) {

  return (
    <>
    <Card border="warning" style={{ width: '18rem' }} className='mt-5'>
        <Card.Header>Question # { question.id }</Card.Header>
            <Card.Body>
                <Card.Title> By { question.author }</Card.Title>
                    <Card.Text>
                        {question.question}
                        Created On: { question.created_on }
                    </Card.Text>
            </Card.Body>
    </Card>
    </>
  )
}