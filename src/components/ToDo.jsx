import React from "react";
import EditTask from "./EditTask";

const ToDo = ({ task, index, tasklist, SetTaskList }) => {
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
