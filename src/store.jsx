import { composeWithDevTools } from "@redux-devtools/extension";
import { useState } from "react";
import { SiAppgallery } from "react-icons/si";
import { useDispatch } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
const add_task = "task/add";
const delete_task = "task/delete";
const Fetch_Task = "task/fetch";

const initialState = {
  task: [],
  isLoading: false,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_task:
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case delete_task:
      const updatedTask = state.task.filter((currTask, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        task: updatedTask,
      };
    case Fetch_Task:
      return {
        ...state,
        task: [...state.task, ...action.payload],
      };
    default:
      console.log("default");
      break;
  }
};

//action creator is a function that creates an action object.
export const addTask = (data) => {
  return { type: add_task, payload: data };
};

export const deleteTask = (id) => {
  return { type: delete_task, payload: id };
};

export const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
// console.log(store);

//returns current State of redux Application
console.log("initialState", store.getState());

//dispatch action to add task
store.dispatch(addTask(" task 1 added"));
console.log("updated State:", store.getState());
store.dispatch(addTask(" task 2 added"));
console.log("updated State:", store.getState());
store.dispatch(addTask(" task 3 added"));
console.log("updated State:", store.getState());

store.dispatch({ type: add_task, payload: "task 4 added" });
console.log("updated State:", store.getState());

store.dispatch(deleteTask(1));
console.log("Deleted State:", store.getState());

//Connect Redux's store and actions to React components. Allows components to access global State and dispatch actions.
//install react-redux
//wrap app with Provider

//others ere just action creator
//fun returning async functions- middleware- REDUX THUNK
//dispatch arg is present
export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3",
      );
      const task = await res.json();
      console.log(task);
      dispatch({
        type: Fetch_Task,
        payload: task.map((currTask) => currTask.title),
      });
    } catch (e) {
      console.log(e);
    }
  };
};
