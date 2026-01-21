//Import Usestate from react
import { useState } from "react";

const AddTask = ({ tasklist, SetTaskList }) => {
  // State to control visibility of the add-task modal
  const [addModal, setAddModal] = useState(false);

  // State to store the project name input value
  const [projectName, setProjectName] = useState("");

  // State to store the task description input value
  const [taskDescription, setTaskDescription] = useState("");

  // State to store validation or error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Handles input changes for form fields
  const handleInput = (e) => {
    const { name, value } = e.target;

    // Update project name when its input changes
    if (name === "Projectname") {
      setProjectName(value);
    }

    // Show error message if project name is empty
    if (name === "Projectname" && value === "") {
      setErrorMessage("Enter project name to continue");
    }

    // Update task description when its input changes
    if (name === "TaskDescription") setTaskDescription(value);
  };

  // Handles form submission for adding a new task
  const handleAdd = (e) => {
    e.preventDefault();

    // Validate required project name field
    if (!projectName) {
      setErrorMessage("Enter project name to continue");
    } else {
      // Create a new task object
      const newTask = {
        id: Date.now(),
        projectName,
        taskDescription,
        timestamp: new Date(),
        duration: 0,
      };

      // Update task list state and persist to localStorage
      SetTaskList((prev) => {
        const updated = [...prev, newTask];
        localStorage.setItem("taskList", JSON.stringify(updated));
        return updated;
      });

      // Close modal after adding task
      setAddModal(false);

      // Reset input fields
      setProjectName("");
      setTaskDescription("");
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
        onClick={() => setAddModal(true)}
      >
        + NEW
      </button>
      {addModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12  max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className=" flex flex-row justify-between p-5 border-b border-state-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add New Task</h3>
                <button
                  onClick={() => setAddModal(false)}
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                >
                  X
                </button>
              </div>
              <form className="px-6 pt-6 pb-4">
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="project-name"
                  >
                    Project Name
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="project-name"
                    type="text"
                    placeholder="Project name"
                    name="Projectname"
                    value={projectName}
                    onChange={handleInput}
                    required
                  />
                  <p className="text-red-500 text-center mt-2 mb-5">
                    {errorMessage}
                  </p>
                </div>
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="project-name"
                  >
                    Task Description
                  </label>
                  <textarea
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                    id="task-description"
                    rows="5"
                    placeholder="Task description"
                    name="TaskDescription"
                    value={taskDescription}
                    onChange={handleInput}
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                <button
                  className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                  onClick={handleAdd}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

// Exports the component as the default export
export default AddTask;
