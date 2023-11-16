import { useState, useEffect} from "react"
import Question from "../components/Question"
import QuestionType from "../types/question"


export default function QuestionsView() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect( () => {
        fetch('https://cae-bookstore.herokuapp.com/question/all')
            .then(res => res.json())
            .then(data => setQuestions(data['questions']))
    }, [])

return (
    <>
    <h2>Questions</h2>
    {questions.map((question) => (
        <Question key={question.id} question={question}/>
    ))}
    </>
    )
}