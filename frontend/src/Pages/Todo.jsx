import axios from "axios";
import { useEffect, useState } from 'react';

const Todo = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [todos, setTodos] = useState([]);

  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const priorities = ['Low', 'Medium', 'High'];

  // INSERTING TASK 
  const handleAddTask = async () => {
    if (!task.trim()) return;

    const token = localStorage.getItem("token");

    // If user is logged in, save to server
    if (token) {
      try {
        const { data } = await axios.post(
          "http://localhost:2102/task/create",
          {
            task,
            priority,
            is_completed: false,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (data && data.data) {
          setTodos([data.data, ...todos]); // prepend created task
          setTask("");
          setPriority("Low");
        } else {
          console.log(data.message || "Failed to create task");
        }
      } catch (err) {
        console.error("Failed to create task:", err.response?.data?.message || err);
      }
    } else {
      // Temporary task for non-logged-in users
      const tempTask = {
        _id: Date.now(), // generate unique id
        task,
        priority,
        is_completed: false,
        createdAt: new Date().toLocaleString(),
        temp: true, // mark as temporary
      };
      setTodos([tempTask, ...todos]);
      setTask("");
      setPriority("Low");
    }
  };



  // LISTING TASK BASED ON THE USER LOGGED IN OR NOT  
  useEffect(() => {
    const fetchTasks = async () => {
      // Check if a user is logged in (e.g., by checking for a valid token)
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No user logged in.");
        return; // Don't fetch tasks if no token is found
      }

      try {
        const { data } = await axios.get(
          "http://localhost:2102/task/list",
          {
            withCredentials: true,
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (data && data.data) {
          setTodos(data.data);
        }

      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []); // Run this effect only once when the component mounts


  // FETCH THE DETAIL OF THE TAKS USER WILL UPDATE
  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.task);
  };

  // UPDATE THE TASK FETCHED BY THE USER 
  const handleUpdate = async (id) => {
    if (!editText.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:2102/task/update/${id}`,
        {
          task: editText, // only updating task text
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );



      // Update state with returned updated task
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? data.data : todo
        )
      );

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to update task:", err.response?.data?.message);
    }
  };

  // DELETE THE TASK OF THE USER 
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:2102/task/delete/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      if (data.message === "Task Deleted Successfully") {
        // Remove deleted task from state
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        console.log(data.message || "Failed to delete task");
      }
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data?.message);
      console.log(err.response?.data?.message || "Server error");
    }
  };


  const toggleCompletion = async (todo) => {
    const updatedStatus = !todo.is_completed;

    // Update UI immediately
    setTodos(prev =>
      prev.map(t => t._id === todo._id ? { ...t, is_completed: updatedStatus } : t)
    );

    const token = localStorage.getItem("token");
    if (!token) return; // Skip server update if not logged in

    try {
      await axios.put(
        `http://localhost:2102/task/update/${todo._id}`,
        { is_completed: updatedStatus },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Failed to update task completion:", err.response?.data?.message || err);
      // Optionally, revert the UI change on failure
      setTodos(prev =>
        prev.map(t => t._id === todo._id ? { ...t, is_completed: !updatedStatus } : t)
      );
    }
  };

  // Progress calculation
  const completionRate = todos.length > 0 ? Math.round((todos.filter(t => t.is_completed).length / todos.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-zinc-800 pb-32">

      <main className="max-w-xl mx-auto pt-44 px-8">
        <header className="mb-16 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-zinc-100 rounded-full text-[9px] uppercase tracking-[0.3em] text-zinc-500">
            Productivity
          </span>
          <h1 className="text-5xl font-serif italic text-zinc-900 tracking-tight">The Art of Doing</h1>

          {/* Progress Bar Detail */}
          {todos.length > 0 && (
            <div className="pt-8 max-w-30 mx-auto">
              <div className="flex justify-between text-[8px] uppercase tracking-widest text-zinc-400 mb-2">
                <span>Progress</span>
                <span>{completionRate}%</span>
              </div>
              <div className="h-px w-full bg-zinc-200">
                <div
                  className="h-px bg-zinc-900 transition-all duration-1000"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* Enhanced Input Section */}
        <div className="mb-16 space-y-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Focus on..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              className="w-full bg-transparent text-lg border-b border-zinc-200 py-4 focus:outline-none focus:border-zinc-900 transition-all duration-700 placeholder:text-zinc-300 placeholder:font-light"
            />
            <button onClick={handleAddTask} className="hover:cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-900 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Priority Selector Detail */}
          <div className="flex gap-4 items-center justify-center">
            <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-400">Priority:</span>
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`text-[9px] uppercase tracking-widest transition-all ${priority === p ? "text-zinc-900 font-bold" : "text-zinc-300 hover:text-zinc-500"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Active Todos List */}
        <div className="space-y-6">
          {todos.length === 0 ? (
            <div className="py-20 text-center opacity-40">
              <p className="font-serif italic text-lg">
                {localStorage.getItem("token") ? "No tasks yet. Add your first task!" : "Please log in to see your tasks."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {todos.map((todo) => (
                <div key={todo._id} className="group flex items-center justify-between bg-white p-6 rounded-2xl border border-zinc-100/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleCompletion(todo)}
                      className={`w-5 h-5 rounded-full border transition-all duration-500 hover:cursor-pointer flex items-center justify-center ${todo.is_completed ? "bg-zinc-900 border-zinc-900" : "border-zinc-200 hover:border-zinc-400"}`}
                    >
                      {todo.is_completed && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </button>

                    {editingId === todo._id ? (
                      <input
                        autoFocus
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => handleUpdate(todo._id)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(todo._id)}
                        className="flex-1 bg-transparent border-b border-zinc-900 focus:outline-none text-zinc-700 py-1"
                      />
                    ) : (
                      <div className="flex flex-col">
                        <span
                          onClick={() => startEdit(todo)}
                          className={`cursor-text transition-all duration-500 ${todo.is_completed ? "text-zinc-300 line-through" : "text-zinc-700"}`}
                        >
                          {todo.task}
                        </span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[8px] text-zinc-400 uppercase tracking-widest cursor-pointer">
                              Added {new Date(todo.createdAt).toLocaleString(undefined, {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })}
                            </span>

                            <span
                              className={`text-[7px] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter font-bold cursor-pointer ${todo.priority === 'High'
                                  ? 'bg-rose-50 text-rose-400'
                                  : todo.priority === 'Medium'
                                    ? 'bg-amber-50 text-amber-400'
                                    : 'bg-zinc-50 text-zinc-400'
                                }`}
                            >
                              {todo.priority}
                            </span>
                          </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* <button className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900">Archive</button> */}
                    <button onClick={() => handleDelete(todo._id)} className="text-[10px] uppercase tracking-[0.2em] text-rose-300 hover:text-rose-500 hover:cursor-pointer">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Todo;