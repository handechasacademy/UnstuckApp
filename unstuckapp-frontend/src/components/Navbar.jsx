function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">Unstuck</h1>
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'new'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-500 hover:text-indigo-600'
          }`}
        >
          New Task
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'tasks'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-500 hover:text-indigo-600'
          }`}
        >
          My Tasks
        </button>
      </div>
    </nav>
  )
}

export default Navbar