function TaskResult({ result }) {
  return (
    <div className="result">
      <h2>{result.goalTitle}</h2>
      <p>{result.microSteps}</p>
      <p>{result.encouragement}</p>
    </div>
  )
}

export default TaskResult