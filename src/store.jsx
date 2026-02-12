import { composeWithDevTools } from "@redux-devtools/extension";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createStore } from "redux";
const add_task = "task/add";
const delete_task = "task/delete";

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

export const store = createStore(taskReducer, composeWithDevTools());
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
