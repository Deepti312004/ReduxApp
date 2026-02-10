const add_task = "task/add";
const delete_task = "task/delete";

const initialState = {
  task: [],
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
