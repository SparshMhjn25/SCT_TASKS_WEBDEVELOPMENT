import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, ListTodo } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Work");

  const categories = ["Work", "Personal", "Shopping", "Others"];

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { text: newTask, category, completed: false },
    ]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ListTodo size={24} /> TaskWave
        </h2>
        <nav className="space-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                category === cat
                  ? "bg-purple-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">{category} Tasks</h1>
        </div>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.filter((t) => t.category === category).length === 0 && (
            <p className="text-gray-400">No tasks yet for {category}.</p>
          )}
          {tasks
            .filter((t) => t.category === category)
            .map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(index)}
                    className={`${
                      task.completed
                        ? "text-green-400"
                        : "text-gray-400 hover:text-green-400"
                    }`}
                  >
                    <CheckCircle2 size={22} />
                  </button>
                  <span
                    className={`text-lg ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
