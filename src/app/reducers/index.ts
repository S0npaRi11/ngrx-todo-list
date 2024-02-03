import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { Todo } from '../Model/todo';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TodoActions } from '../action-types';

export const todoFeatureKey = 'todo';

export interface State extends EntityState<Todo>{
  popupMessage?: {
    type: 'success' | 'error',
    message: string
  },
}

export const adapter = createEntityAdapter<Todo>({
  sortComparer: function(a,b){
    const compare = Number(a.isComplete) - Number(b.isComplete)
    if(compare > 0) return 1
    if(compare < 0) return -1
    else return 0
  }
})

export const initialState = adapter.getInitialState()

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.createTodo, (state, action) =>
    adapter.addOne(action.todo, state)
  ),

  on(TodoActions.deleteTodo, (state, action) =>
    adapter.removeOne(action.id, state)
  ),

  on(TodoActions.updateTodo, (state, action) =>
   adapter.updateOne(action.update, state)
  ),

  on(TodoActions.saveAllTodo, (state,action) =>
    adapter.addMany(action.todoList,state)
  ),

  on(TodoActions.openToaster, (state, action) => {
    return {
      ...state,
      popupMessage: {
        type: 'success',
        message: action.message
      }
    }
  }
  ),

  on(TodoActions.clearToaster, (state, action) => {
    return {
      ...state,
      popupMessage:{
        message: ''
      }
    }
  })
)

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const { selectAll }  = adapter.getSelectors()
