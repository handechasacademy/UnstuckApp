import { useState } from 'react'
import TaskResult from './TaskResult'
import confetti from 'canvas-confetti'

function CreateTaskForm({ onTaskCreated }) {
  const [goalTitle, setGoalTitle] = useState('')
  const [category, setCategory] = useState('')
  const [barriers, setBarriers] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [scareFactor, setScareFactor] = useState(null)

  async function handleSubmit() {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://unstuck-contentapi.onrender.com/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalTitle, category, barriers, scareFactor })
      })
      const data = await response.json()
      setResult(data)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      onTaskCreated()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-xl w-full">
      <div className="mb-6">
        <label className={labelClass}>What task do you struggle with?</label>
        <input
          type="text"
          placeholder="e.g., Clean my room"
          className={inputClass}
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className={labelClass}>Choose a category</label>
        <select
          className={inputClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Learning">Learning</option>
          <option value="Social">Social</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-8">
        <label className={labelClass}>What seems to be stopping you?</label>
        <textarea
          placeholder="Describe the barrier..."
          className={`${inputClass} h-32 resize-none`}
          value={barriers}
          onChange={(e) => setBarriers(e.target.value)}
        />
      </div>

      <div className="mb-8">
        <label className={labelClass}>
          Scare factor: {scareFactor ?? 'Let AI decide'}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          className="w-full"
          value={scareFactor ?? 5}
          onChange={(e) => setScareFactor(Number(e.target.value))}
        />
        <label className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={scareFactor === null}
            onChange={(e) => setScareFactor(e.target.checked ? null : 5)}
          />
          Let AI decide
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg w-full transition-colors"
      >
        {isLoading ? 'Generating...' : 'Break it down ⚡'}
      </button>

      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      {isLoading && <p className="text-gray-400 mt-4 text-sm text-center">This may take a few seconds...</p>}
      {result && <TaskResult result={result} />}
    </div>
  )
}

export default CreateTaskForm