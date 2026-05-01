import ReactMarkdown from 'react-markdown'

function TaskResult({ result }) {
  return (
    <div className="result">
      <h2>{result.goalTitle}</h2>
      <ReactMarkdown>{result.microSteps}</ReactMarkdown>
      <ReactMarkdown>{result.encouragement}</ReactMarkdown>
    </div>
  )
}

export default TaskResult