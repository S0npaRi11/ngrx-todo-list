import { createAction, props } from "@ngrx/store";
import { Todo } from "./Model/todo";
import { Update } from "@ngrx/entity";

export const createTodo = createAction(
  '[Add Todo Component] Create Todo',
  props<{todo: Todo}>()
)

export const deleteTodo = createAction(
  '[App Component] Delete Todo',
  props<{id: string}>()
)

export const getAllTodo = createAction(
  '[App Component] Get All Todo'
)

export const saveAllTodo = createAction(
  '[App Component] Save Multiple Todo',
  props<{todoList: Todo[]}>()
)

export const getOneTodo = createAction(
  '[Todo Details Component] Get One Todo',
  props<{id: string}>()
)

export const saveTodoList = createAction(
  '[Local Storage] Save Todo List',
  props<{todoList: Todo[]}>()
)

export const updateTodo = createAction(
  '[Todo List Component] Update Todo',
  props<{update: Update<Todo>}>()
)

export const openToaster = createAction(
  '[App Component] Toaster Message',
  props<{message: string}>()
)

export const clearToaster = createAction(
  '[App Component] Reset Toaster Message'
)
