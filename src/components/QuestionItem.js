import React from "react";

function QuestionItem({ question, onDelete, onCorrectIndexChange }) {
  const { id, prompt, answers, correctIndex } = question;
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));



  function handleDelete(){

    // onDelete(question.id)

    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE",
    })
    .then(resp=>resp.json())
    .then(()=>onDelete(question.id))
  }

  function handleAnswerChange(event){
    const newCorrectIndex = (event.target.value);

    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        "correctIndex": newCorrectIndex,
      })
    })
    .then(resp =>resp.json())
    .then(data => onCorrectIndexChange(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
