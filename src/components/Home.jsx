import React from "react";
import AddTask from "./AddTask";
import ToDo from "./ToDo";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

export default function Home() {
  const [tasklist, SetTaskList] = useState([]);
  const [completed, SetCompleted] = useState([]);

  useEffect(() => {
    let array = localStorage.getItem("taskList");
    if (array) {
      SetTaskList(JSON.parse(array));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(
        item.id,
        item.projectName,
        item.taskDescription,
        item.timestamp,
        item.duration,
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addToCompleted = (
    id,
    projectName,
    taskDescription,
    timestamp,
    duration,
  ) => {
    const moveTask = tasklist.filter((task) => id === task.id);
    SetCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription, timestamp, duration },
    ]);
    /* handleDelete(moveTask);*/
  };
  const handleDelete = (task) => {
    let removeIndex = tasklist.indexOf(task);
    const updated = [...tasklist];
    updated.splice(removeIndex, 1);
    SetTaskList(updated);
    localStorage.setItem("taskList", JSON.stringify(updated));
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
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg py-2 px-4 bg-gray-200">
            To Do :
          </h2>
          <div className="ml-6 flex flex-col-reverse">
            {tasklist.map((task, i) => (
              <ToDo
                key={i}
                task={task}
                index={i}
                tasklist={tasklist}
                SetTaskList={SetTaskList}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col" ref={drop}>
          <h2 className="text-xl font-semibold w-3/4 max-w-lg py-2 px-4 bg-gray-200">
            Completed :
          </h2>
          {completed.map((task, i) => (
            <ToDo
              key={i}
              task={task}
              index={i}
              tasklist={tasklist}
              SetTaskList={SetTaskList}
            />
          ))}
        </div>
      </div>
    </>
  );
}
