import React from "react";
import EditTask from "./EditTask";
import { useState, useEffect } from "react";

const ToDo = ({ task, index, tasklist, SetTaskList }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

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

  const handleDelete = (itemID) => {
    let removeIndex = tasklist.indexOf(task);
    tasklist.splice(removeIndex, 1);
    SetTaskList((currentTasks) =>
      currentTasks.filter((todo) => todo.id !== itemID)
    );
  };
  return (
    <>
      <div className="flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg">
        <div className="w-full flex flex-row justify-between">
          <p className="font-semibold text-xl">{task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            tasklist={tasklist}
            SetTaskList={SetTaskList}
          />
        </div>

        <p className="text-lg py-2">{task.taskDescription}</p>
        <div className="w-full flex flex flex-row items-center justify-center justify-evenly">
          <div className="w-1/4 text-xl font-semibold py-4">
            <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
          </div>
          <div className="flex flex-row justify-evenly gap-4">
            {running ? (
              <button
                className="border rounded-lg py-1 px-3"
                onClick={() => {
                  setRunning(false);
                }}
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
              className="border rounded-lg py-1 px-3"
              onClick={() => {
                setTime(0);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-red-500 text-white text-sm uppercase font-senibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDo;
