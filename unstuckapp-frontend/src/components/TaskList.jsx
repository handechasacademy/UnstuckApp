import { useState, useEffect } from 'react'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [completedSteps, setCompletedSteps] = useState({})
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('https://localhost:7070/api/tasks')
      const data = await response.json()
      setTasks(data)
    }
    fetchTasks()
  }, [])

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id)
  }

  function toggleStep(taskId, stepIndex) {
    const key = `${taskId}-${stepIndex}`
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }))
  }

  async function deleteTask(id) {
    await fetch(`https://localhost:7070/api/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(task => task.id !== id))
  }

  if (tasks.length === 0) return (
    <div className="w-full max-w-xl mt-8 text-center text-gray-400 dark:text-gray-500">
      No tasks yet — create one!
    </div>
  )

  const filteredTasks = tasks
    .filter(task => task.goalTitle.toLowerCase().includes(search.toLowerCase()))
    .filter(task => filterCategory === '' || task.category === filterCategory)

  const inputClass = "border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"

  return (
    <div className="w-full max-w-xl mt-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your saved tasks</h2>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className={`flex-1 ${inputClass} placeholder-gray-300`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={inputClass}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Learning">Learning</option>
          <option value="Social">Social</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filteredTasks.map(task => {
          const steps = task.microSteps
            .split('\n')
            .filter(step => step.trim() !== '')

          return (
            <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center p-5">
                <div
                  className="flex items-center gap-2 cursor-pointer flex-1"
                  onClick={() => toggleExpand(task.id)}
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white">{task.goalTitle}</h3>
                  <span className="text-gray-400 text-sm">{expandedId === task.id ? '▲' : '▼'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full">
                    {task.category}
                  </span>
                  {task.scareFactor && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full">
                       {task.scareFactor}/10
                    </span>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 text-sm px-2 py-1 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {expandedId === task.id && (
                <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{steps.filter((_, i) => completedSteps[`${task.id}-${i}`]).length}/{steps.length} steps</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${(steps.filter((_, i) => completedSteps[`${task.id}-${i}`]).length / steps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {steps.map((step, index) => {
                    const key = `${task.id}-${index}`
                    const done = completedSteps[key]
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 mb-3 cursor-pointer"
                        onClick={() => toggleStep(task.id, index)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${done ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 dark:border-gray-500'}`}>
                          {done && <span className="text-white text-xs">✓</span>}
                        </div>
                        <p className={`text-sm ${done ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          {step}
                        </p>
                      </div>
                    )
                  })}

                  {task.encouragement && (
                    <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{task.encouragement}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList