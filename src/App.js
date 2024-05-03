import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [newlyAddedIndex, setNewlyAddedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTasks = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task.trim()]);
      setTask("");
      setNewlyAddedIndex(tasks.length); // Store the index of the newly added task
    }
  };

  const deleteTasks = (index) => {
    const updatedList = [...tasks];
    updatedList.splice(index, 1);
    setTasks(updatedList);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEditedTask = (index) => {
    const updatedList = [...tasks];
    updatedList[index] = editedTask.trim();
    setTasks(updatedList);
    setEditIndex(null);
    setEditedTask("");
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{ backgroundColor: "#D8BFD8", height: "100vh" }}
    >
      <h1 className="text-4xl m-16 font-bold">Simple To Do App</h1>

      <div className="p-6">
        <input
          className="bg-slate-100 rounded-md p-4 m-4 "
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          placeholder="Create a new todo"
        />
        <button
          onClick={addTasks}
          className="bg-green-500 p-3 m-3 text-white rounded font-bold hover:bg-green-600"
        >
          Add Task
        </button>
      </div>

      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <div
                className={`flex bg-slate-100 m-4 py-4 pl-12 pr-4 rounded-md ${
                  index === newlyAddedIndex ? "bg-sky-400" : ""
                }`}
                key={index}
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                      className="bg-white p-2 mx-1 rounded-md flex-grow"
                    />
                    <button
                      onClick={() => saveEditedTask(index)}
                      className="bg-blue-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <li className="self-center font-semibold pr-10 mr-6">
                      {task}
                    </li>
                    <button
                      onClick={() => editTask(index)}
                      className="bg-blue-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTasks(index)}
                      className="bg-red-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </ul>
        ) : (
          <div>
            <p>No Task Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
