import { Component, Input } from '@angular/core';
import { Todo } from '../Model/todo';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { deleteTodo, updateTodo } from '../todo.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() data:Todo[] | null = []

  constructor(
    private _store:Store<State>
  ){}

  delete(id:string){
    this._store.dispatch(deleteTodo({id}))
  }

  markComplete(todo:Todo){
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
       isComplete: !todo.isComplete
      }
    }

    this._store.dispatch(updateTodo({update}))
  }

  markImportant(todo:Todo){
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
       isImportant: !todo.isImportant
      }
    }

    this._store.dispatch(updateTodo({update}))
  }
}
