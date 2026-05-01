import { useState } from 'react'
import CreateTaskForm from './components/CreateTaskForm'
import TaskList from './components/TaskList'
import Navbar from './components/Navbar'

function App() {
  const [activeTab, setActiveTab] = useState('new')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="py-12 px-4 flex flex-col items-center">
          {activeTab === 'new' && <CreateTaskForm />}
          {activeTab === 'tasks' && <TaskList />}
        </div>
      </div>
    </div>
  )
}

export default App