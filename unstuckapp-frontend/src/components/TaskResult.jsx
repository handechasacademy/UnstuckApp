import ReactMarkdown from 'react-markdown'

function TaskResult({ result }) {
  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{result.goalTitle}</h2>
      
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
          Your Microsteps
        </h3>
        <div className="prose prose-gray text-gray-700 text-sm leading-relaxed">
          <ReactMarkdown>{result.microSteps}</ReactMarkdown>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-4">
        <h3 className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-2">
          Encouragement
        </h3>
        <div className="text-gray-700 text-sm leading-relaxed">
          <ReactMarkdown>{result.encouragement}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default TaskResult