import { useState } from 'react'
import TaskResult from './TaskResult'

function CreateTaskForm() {
  const [goalTitle, setGoalTitle] = useState('')
  const [category, setCategory] = useState('')
  const [barriers, setBarriers] = useState('')
  const [result, setResult] = useState(null)

  async function handleSubmit() {
  const response = await fetch('https://localhost:7070/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      goalTitle: goalTitle,
      category: category,
      barriers: barriers
    })
  })
  
  const data = await response.json()
  setResult(data)
  console.log(data)
}

  return (
    <div className="form-container">
      <input 
        type="text" 
        placeholder="What task do you struggle with?" 
        className="goal-title-input"
        value={goalTitle}
        onChange={(e) => setGoalTitle(e.target.value)}
      />
      <input
        type="text" 
        placeholder="Choose a category" 
        className="category-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        placeholder="What seems to be stopping you?" 
        className="barriers-input"
        value={barriers}
        onChange={(e) => setBarriers(e.target.value)}
      /> 
      <button className="submit-btn" onClick={handleSubmit}>
        Break it down
      </button>
      {result && <TaskResult result={result} />}
    </div>
  )
}

export default CreateTaskForm