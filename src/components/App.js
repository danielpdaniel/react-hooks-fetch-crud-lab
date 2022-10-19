import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState(false);

 function handleUpdatedQuestions(info){
  setQuestions(info)
 }

 function handleNewQuestion(info){
  setQuestions([...questions, info])
  
 }

 function handleDelete(deletedId){
  const newQuestions = questions.filter(question=> question.id !== deletedId)
  setQuestions(newQuestions)
 }

//  function handleAnswerChange(questionId, newCorrectIndex, prompt, answers ){
//   const newIndex = parseInt(newCorrectIndex)
//   const newQuestions = questions.map(question => question.id === questionId ? 
//     {answers: answers,
//     correctIndex: newIndex,
//     id: question.id,
//     prompt: prompt,
//     } : question)

//   setQuestions(newQuestions)
//  }
 
function handleAnswerChange(patchedQuestion){
  const newQuestions = questions.map(question => question.id === patchedQuestion.id ? patchedQuestion : question)
  setQuestions(newQuestions)
}


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} onNewQuestion={handleNewQuestion} /> : <QuestionList questions={questions} onQuestionsLoaded={handleUpdatedQuestions} onDelete={handleDelete} onCorrectIndexChange={handleAnswerChange}/>}
    </main>
  );
}

export default App;
