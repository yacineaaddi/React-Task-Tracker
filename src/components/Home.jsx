// Imports the AddTask component
import AddTask from "./AddTask";

// Imports the ToDo component
import ToDo from "./ToDo";

//Import Usestate and Useeffect from react
import { useEffect, useState } from "react";

// useDrop hook from react-dnd
import { useDrop } from "react-dnd";

export default function Home() {
  // State to store the list of current (active) tasks
  const [tasklist, SetTaskList] = useState([]);

  // State to store the list of completed tasks
  const [completed, SetCompleted] = useState([]);

  useEffect(() => {
    // Retrieve stored tasks from localStorage on component mount
    let Currtasks = localStorage.getItem("taskList");
    let Completedtasks = localStorage.getItem("completed");

    // If there is stored data, update state from localStorage
    if (Currtasks || Completedtasks) {
      SetTaskList(JSON.parse(Currtasks));
      SetCompleted(JSON.parse(Completedtasks));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    // Specifies the accepted draggable item type
    accept: "todo",

    // Triggered when a draggable item is dropped on this component
    drop: (item) => console.log(item.duration),

    // Collects drop state to know whether an item is currently over the drop area
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addToCompleted = (item) => {
    // Add the dropped task to the completed list
    console.log(item);
    SetCompleted((prev) => {
      const updated = [...prev, { ...item }];
      localStorage.setItem("completed", JSON.stringify(updated));
      return updated;
    });

    // Remove the task from the active task list
    SetTaskList((prev) => {
      const updated = prev.filter((task) => task.id !== item.id);
      localStorage.setItem("taskList", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDelete = (task, list, setList, storagekey) => {
    // Find the index of the task to be removed in the given list
    let removeIndex = list.indexOf(task);

    // Create a shallow copy of the list to avoid direct mutation
    const updated = [...list];

    // Remove the task at the found index
    updated.splice(removeIndex, 1);

    // Update the corresponding state
    setList(updated);

    // Persist the updated list to localStorage
    localStorage.setItem(storagekey, JSON.stringify(updated));
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hi There !</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click </p>
        <AddTask tasklist={tasklist} SetTaskList={SetTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div className="flex sm:flex-row flex-col ">
        <div className="w-full  sm:p-6 py-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold w-3/4 max-w-lg py-2 px-4 bg-gray-200">
            To Do :
          </h2>
          {tasklist.map((task, i) => (
            <ToDo
              key={task.id}
              task={task}
              index={i}
              list={tasklist}
              setList={SetTaskList}
              storagekey="taskList"
              onDelete={(task) =>
                handleDelete(task, tasklist, SetTaskList, "taskList")
              }
            />
          ))}
        </div>
        <div
          className="w-full  sm:p-8 p-2 flex flex-col items-center"
          ref={drop}
        >
          <h2 className="text-xl font-semibold w-3/4 max-w-lg py-2 px-4 bg-gray-200">
            Completed :
          </h2>
          {completed.map((task, i) => (
            <ToDo
              key={task.id}
              index={i}
              list={completed}
              setList={SetCompleted}
              storagekey="completed"
              onDelete={(task) =>
                handleDelete(task, completed, SetCompleted, "completed")
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
