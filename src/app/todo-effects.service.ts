import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { TodoActions } from './action-types';
import { concatMap, map, of, tap } from 'rxjs';
import { openToaster, saveAllTodo } from './todo.actions';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoEffectsService {

constructor(private actions$: Actions, private _todo: TodoService) { }

  saveTodoToLocalstorage$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(TodoActions.createTodo),
        tap((action) => this._todo.add(action.todo)),
        map(action => openToaster({message: 'Task saved'}))
      )
    }
  );

  getTodoListFromLocalstorage$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(TodoActions.getAllTodo),
        concatMap(() => of(this._todo.getTodoList())),
        map((todoList) => saveAllTodo({todoList}))
      );
    });

    deleteTodoFromLocalstorage = createEffect(() => {
      return this.actions$.pipe(
        ofType(TodoActions.deleteTodo),
        tap((action) => this._todo.delete(action.id)),
        map(() => openToaster({message: 'Task Deleted'}))
      )
    })


    updateTodoInLocalstorage = createEffect(() => {
      return this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        tap((action) => this._todo.update(action.update.id, action.update.changes)),
        map(() => openToaster({message: 'Task updated'}))
      )
    })

}
