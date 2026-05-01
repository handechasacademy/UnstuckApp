import { useState, useEffect } from 'react'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [completedSteps, setCompletedSteps] = useState({})

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
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  async function deleteTask(id) {
    await fetch(`https://localhost:7070/api/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  if (tasks.length === 0) return (
    <div className="w-full max-w-xl mt-8 text-center text-gray-400">
      No tasks yet — create one!
    </div>
  )

  return (
    <div className="w-full max-w-xl mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your saved tasks</h2>
      <div className="flex flex-col gap-3">
        {tasks.map(task => {
          const steps = task.microSteps
            .split('\n')
            .filter(step => step.trim() !== '')

          return (
            <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center p-5">
                <div
                  className="flex items-center gap-2 cursor-pointer flex-1"
                  onClick={() => toggleExpand(task.id)}
                >
                  <h3 className="font-semibold text-gray-800">{task.goalTitle}</h3>
                  <span className="text-gray-400 text-sm">{expandedId === task.id ? '▲' : '▼'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    {task.category}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 text-sm px-2 py-1 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {expandedId === task.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  {steps.map((step, index) => {
                    const key = `${task.id}-${index}`
                    const done = completedSteps[key]
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 mb-3 cursor-pointer"
                        onClick={() => toggleStep(task.id, index)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${done ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                          {done && <span className="text-white text-xs">✓</span>}
                        </div>
                        <p className={`text-sm text-gray-700 ${done ? 'line-through text-gray-400' : ''}`}>
                          {step}
                        </p>
                      </div>
                    )
                  })}
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