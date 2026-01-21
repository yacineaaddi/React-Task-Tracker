//Import Usestate and Useeffect from react
import { useState, useEffect } from "react";

const EditTask = ({ task, index, setList, storagekey }) => {
  // State to control visibility of the edit modal
  const [editModal, SetEditModal] = useState(false);

  // State to store the edited project name
  const [projectName, setProjectName] = useState("");

  // State to store the edited task description
  const [taskDescription, setTaskDescription] = useState("");

  // Effect to initialize input fields with existing task data on mount
  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  // Handles input changes for edit form fields
  const handleInput = (e) => {
    const { name, value } = e.target;

    // Update project name field
    if (name === "Projectname") setProjectName(value);

    // Update task description field
    if (name === "TaskDescription") setTaskDescription(value);
  };

  // Handles task update submission
  const handleUpdate = (e) => {
    e.preventDefault();

    // Update the task list state immutably
    setList((prev) => {
      const updated = prev.map((task, i) =>
        // Replace the task that matches the given index
        i === index
          ? {
              ...task,
              projectName,
              taskDescription,
            }
          : task,
      );

      // Debug log to verify correct localStorage key
      console.log(storagekey);

      // Persist updated list to localStorage
      localStorage.setItem(storagekey, JSON.stringify(updated));

      return updated;
    });

    // Close the edit modal after updating
    SetEditModal(false);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white text-sm md:text-base uppercase font-semibold py-1.5 mt-6 mb-1 rounded-lg px-6"
        onClick={() => SetEditModal(true)}
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12  max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className=" flex flex-row justify-between p-5 border-b border-state-200 rounded-t">
                <h3 className="text-3xl font-semibold">Edit Task</h3>
                <button
                  onClick={() => SetEditModal(false)}
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
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                    id="project-name"
                    type="text"
                    placeholder="Project name"
                    name="Projectname"
                    value={projectName}
                    onChange={handleInput}
                    required
                  />
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
                  onClick={handleUpdate}
                >
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditTask;
