import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( {questions, onQuestionsLoaded, onDelete, onCorrectIndexChange} ) {

  useEffect(()=>{
    let fetchQuestions = 
    fetch("http://localhost:4000/questions")
    .then(resp=>resp.json())
    .then(data=> onQuestionsLoaded(data))

    return function cleanup(){
      fetchQuestions = null
    }
    
    
  }, [])


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions ? questions.map(question => 
        <QuestionItem 
          onDelete={onDelete}
          question={question} key={question.id}
          onCorrectIndexChange={onCorrectIndexChange}
          />) :
          <h2>Loading...</h2>
        }
        </ul>
    </section>
  );
}

export default QuestionList;
