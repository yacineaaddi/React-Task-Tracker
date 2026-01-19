import React from "react";
import EditTask from "./EditTask";
import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";

const ToDo = ({ task, index, tasklist, SetTaskList }) => {
  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleTime = (e) => {
    e.preventDefault();
    const action = e.currentTarget.dataset.action;
    setRunning(false);
    if (action === "reset") {
      setTime(0);
    }

    let taskIndex = tasklist.indexOf(task);
    tasklist.splice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: action === "stop" ? time : 0,
    });

    localStorage.setItem("taskList", JSON.stringify(tasklist));
  };
  /*
  const handleStop = (e) => {
    console.log(e);
    setRunning(false);
    let taskIndex = tasklist.indexOf(task);
    tasklist.splice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: time,
    });

    localStorage.setItem("taskList", JSON.stringify(tasklist));
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    let taskIndex = tasklist.indexOf(task);
    tasklist.splice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: 0,
    });

    localStorage.setItem("taskList", JSON.stringify(tasklist));
  };
*/
  const handleDelete = (task) => {
    let removeIndex = tasklist.indexOf(task);
    const updated = [...tasklist];
    updated.splice(removeIndex, 1);
    SetTaskList(updated);
    localStorage.setItem("taskList", JSON.stringify(updated));
  };
  return (
    <>
      <div
        ref={drag}
        className="flex flex-col items-start justify-start bg-white my-4  py-4 px-6 w-3/4 max-w-lg"
      >
        <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between">
          <p className="font-semibold text-xl">Name : {task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            tasklist={tasklist}
            SetTaskList={SetTaskList}
          />
        </div>

        <p className="text-lg py-2">Description : {task.taskDescription}</p>
        <div className="w-full flex flex-row items-center justify-evenly">
          <div className="sm:w-1/4 text-xl font-semibold py-4">
            <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
          </div>
          <div className="flex flex-row justify-evenly gap-4">
            {running ? (
              <button
                data-action="stop"
                className="border rounded-lg py-1 px-3"
                onClick={handleTime}
              >
                Stop
              </button>
            ) : (
              <button
                className="border rounded-lg py-1 px-3"
                onClick={() => {
                  setRunning(true);
                }}
              >
                Start
              </button>
            )}
            <button
              data-action="reset"
              className="border rounded-lg py-1 px-3"
              onClick={handleTime}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-red-500 text-white text-sm uppercase font-senibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
            onClick={() => handleDelete(task)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDo;
