import { useState, useEffect} from "react"
import Question from "../components/Question"
import QuestionType from "../types/question"
import CategoryType from "../types/category";
import { getAllQuestions } from "../lib/apiWrapper";
import QuestionForm from "../components/QuestionForm";
import { Button } from "react-bootstrap";

type QuestionsViewProps = {
    isLoggedIn: boolean,
    flashMessage: (message:string, category: CategoryType) => void
}


export default function QuestionsView( {isLoggedIn, flashMessage}: QuestionsViewProps ) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect( () => {
        fetch('https://cae-bookstore.herokuapp.com/question/all')
            .then(res => res.json())
            .then(data => setQuestions(data['questions']))
    }, [formSubmitted])

return (
    <>
    <h2>Questions</h2>
    { isLoggedIn && <Button variant='primary' onClick={() => setDisplayForm(!displayForm)}>
        {displayForm ? 'Hide Form' : '+ Create New Question'}
        </Button>}
        {displayForm && 
        <QuestionForm flashMessage={flashMessage} setDisplay={setDisplayForm} setForm={setFormSubmitted} toggle={formSubmitted} />}
    {questions.map((question) => (
        <Question key={question.id} question={question}/>
    ))}
    </>
    )
}