import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./reducers";
import * as todoReducers from './reducers/index'

export const selectAllTodoList = createFeatureSelector<State>("todo")

export const selectAllTodo = createSelector(
  selectAllTodoList,
  todoReducers.selectAll
)

export const selectToasterMessage = createSelector(
  selectAllTodoList,
  state => state.popupMessage?.message
)

export const selectImportantTodoCount = createSelector(
 selectAllTodo,
 todoList => todoList.filter(dt => dt.isImportant && !dt.isComplete).length
)

export const selectImportantTodo = createSelector(
  selectAllTodo,
  todoList => todoList.filter(dt => dt.isImportant)
)

export const selectPendingTodo = createSelector(
  selectAllTodo,
  todoList => todoList.filter(dt => !dt.isComplete)
)

export const selectCompleteTodo = createSelector(
  selectAllTodo,
  todoList => todoList.filter(dt => dt.isComplete)
)

export const filterTodoList = (filter: string) => createSelector(
  selectAllTodo,
  todoList => {
    switch (filter) {
      case 'all':
          return todoList
      case 'important':
          return todoList.filter(dt => dt.isImportant && !dt.isComplete)
      case 'pending':
          return todoList.filter(dt => !dt.isComplete)
        case 'complete':
          return todoList.filter(dt => dt.isComplete)
    }

    return todoList
  }
)

// export function filterTodoList(filter: string){
//   switch (filter) {
//     case 'all':
//       return selectAllTodo
//     case 'important':
//       return selectImportantTodo
//     case 'pending':
//       return selectPendingTodo
//     case 'complete':
//       return selectCompleteTodo
//   }
//   return
// }
