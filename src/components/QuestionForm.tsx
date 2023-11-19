import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import QuestionType from '../types/question';
import CategoryType from '../types/category';
import { createQuestion } from '../lib/apiWrapper';


type QuestionProps = {
    flashMessage: (message: string, category: CategoryType) => void,
    setDisplay: (display:boolean) => void,
    setForm: (form:boolean) => void,
    toggle: boolean
}


export default function QuestionForm({ flashMessage, setDisplay, setForm, toggle }: QuestionProps) {
    const [questionFormData, setQuestionFormData] = useState<Partial<QuestionType>>({question:'', answer:''})

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setQuestionFormData({...questionFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent): Promise<void> => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await createQuestion(token, questionFormData)
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.id} has been created`, 'info')
            setDisplay(false)
            setForm(!toggle);
        }
    }

  return (
    <Card>
    <Card.Body>
        <Form onSubmit={handleFormSubmit}>
            <Form.Label htmlFor='question'>Question</Form.Label>
            <Form.Control name='question' placeholder='Enter Your Question' onChange={handleInputChange} value={questionFormData.question} />
            <Form.Label htmlFor='answer'>Answer</Form.Label>
            <Form.Control name='answer' placeholder='Enter Answer' onChange={handleInputChange} value={questionFormData.answer} />
            <Button variant='primary' className='w-100 mt-3' type='submit'>Create Question</Button>
        </Form>
    </Card.Body>
</Card>
    )
}