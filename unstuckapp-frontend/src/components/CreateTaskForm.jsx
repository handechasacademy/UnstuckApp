import { useState } from 'react'
import TaskResult from './TaskResult'

function CreateTaskForm() {
  const [goalTitle, setGoalTitle] = useState('')
  const [category, setCategory] = useState('')
  const [barriers, setBarriers] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  async function handleSubmit() {
    setIsLoading(true)
    setError(null)
    try  {
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
    } catch (err) {
        setError('Something went wrong. Please try again.')
    } finally {
        setIsLoading(false);
    }
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
      <button className="submit-btn" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Break it down'}
      </button>
      {isLoading && <p>Generating your breakdown...</p>}
      {error && <p className="error">{error}</p>}
      {result && <TaskResult result={result} />}
    </div>
  )
}

export default CreateTaskForm