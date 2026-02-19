import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { addTask, deleteTask, fetchTask } from "../store";
import { useState } from "react";

export const Todo = () => {
  const [tasks, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(tasks));
    return setTask("");
  };

  const handleFetchTask = () => {
    dispatch(fetchTask());
  };

  const handleDeleteTask = (idx) => {
    return dispatch(deleteTask(idx));
  };
  const task = useSelector((store) => store.taskReducer.task);
  //const task = useSelector((store) => store.task);
  //console.log("React State:", state);

  return (
    <>
      <div className="container">
        <div className="todo-app">
          <h1>TodoList</h1>

          <div className="row">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="input-box"
                placeholder="Add new task"
                value={tasks}
                onChange={(e) => setTask(e.target.value)}
              ></input>
              <button>Add Task</button>
            </form>
          </div>

          <button onClick={handleFetchTask}>Fetch Tasks</button>

          <ul id="list-container">
            {task.map((currTask, idx) => {
              return (
                <li key={idx}>
                  <p>
                    {idx + 1} {currTask}
                  </p>
                  <div>
                    <MdDelete
                      className="icon-style"
                      onClick={() => handleDeleteTask(idx)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ul></ul>
    </>
  );
};
