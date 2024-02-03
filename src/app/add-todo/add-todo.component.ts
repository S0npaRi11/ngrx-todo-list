import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Todo } from '../Model/todo';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { createTodo } from '../todo.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  form = this._fb.group({
    name: [''],
    description: [''],
    completeBy: [],
    isImportant: [false]
  })

  constructor(private _fb: FormBuilder, private _store:Store<State>){}

  save(){
    const todo:Todo = {
      id: Date.now().toString(),
      createdAt: new Date(),
      name: this.form.value.name || '',
      isImportant: false,
      isComplete: false,
      completeBy: this.form.value.completeBy || undefined
    }

    this._store.dispatch(createTodo({todo}))

  }
}
