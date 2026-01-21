// Imports useState and useEffect
import { useState, useEffect } from "react";

// useDrag hook from react-dnd
import { useDrag } from "react-dnd";

// Imports the EditTask component, likely used for editing task details
import EditTask from "./EditTask";

//this component represents a single task item

const ToDo = ({ task, index, list, setList, onDelete, storagekey }) => {
  // Local state to track elapsed time for this task
  const [time, setTime] = useState(task.duration);

  // Boolean state to control whether the timer is running
  const [running, setRunning] = useState(false);

  //useDrag hook from react-dnd

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: task.id,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: Number(task.duration),
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  //Timer effect
  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }

    // Cleanup to avoid memory leaks
    return () => clearInterval(interval);
  }, [running]);

  //handleTime

  const handleTime = (e) => {
    e.preventDefault();

    const action = e.currentTarget.dataset.action;
    setRunning(false);

    setList((prevList) => {
      const updatedList = prevList.map((t) =>
        t.id === task.id
          ? {
              ...t,
              duration:
                action === "stop" ? time : action === "reset" ? 0 : t.duration,
            }
          : t,
      );

      localStorage.setItem(storagekey, JSON.stringify(updatedList));
      return updatedList;
    });

    if (action === "reset") {
      setTime(0);
    }
  };

  return (
    <>
      <div
        ref={drag}
        className="flex flex-col items-start justify-start bg-white my-4  py-4 px-6 w-3/4 max-w-lg"
      >
        <p className="font-semibold md:text-lg text-base">
          Name : {task.projectName}
        </p>

        <p className="text-base md:text-lg py-2">
          Description : {task.taskDescription}
        </p>
        <div className="w-full flex flex-col lg:flex-row md:justify-around items-center justify-items-center">
          <div className="text-xl font-semibold py-4">
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
        <div className="w-full flex flex-col md:flex-row justify-center items-center sm:justify-between">
          <EditTask
            task={task}
            index={index}
            setList={setList}
            storagekey={storagekey}
          />
          <button
            className="bg-red-500 text-white text-sm md:text-sm uppercase font-semibold py-1.5  mt-6 mb-1 rounded-lg px-6"
            onClick={() => onDelete(task)}
            storagekey={storagekey}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

// Exports the component as the default export
export default ToDo;
