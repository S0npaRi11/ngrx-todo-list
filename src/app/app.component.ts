import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './reducers';
import { Observable } from 'rxjs';
import { Todo } from './Model/todo';
import { filterTodoList, selectAllTodo, selectImportantTodoCount, selectToasterMessage } from './todo.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { clearToaster, getAllTodo, openToaster } from './todo.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-todo-list';
  todoList$: Observable<Todo[]> = new Observable();
  importantCount$: Observable<number> = new Observable()

  // selectedFilter = new FormControl()

  filter = this._fb.group({
    value: []
  })

  constructor(
    private _store: Store<State>,
    private _dialog:MatDialog,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ){}

  ngOnInit(): void {
    this._store.dispatch(getAllTodo())
    this.todoList$ = this._store.pipe(select(selectAllTodo))
    this.importantCount$ = this._store.pipe(select(selectImportantTodoCount))

    this._store.pipe(select(selectToasterMessage))
      .subscribe((message) => {
        if(message){
          this.toaster(message)
        }
      })

      this.filter.valueChanges.subscribe(data => {
        // console.log(data)
        if(data.value){
          this.todoList$ = this._store.pipe(select(filterTodoList(data.value)))
        }else{
          this.todoList$ = this._store.pipe(select(selectAllTodo))
        }
      })
    // this._store.pipe(select(selectAllTodo)).subscribe(data => console.log(data))
  }

  addTodo(){
    this._dialog.open(AddTodoComponent)
  }

  openToaster(){
    this._store.dispatch(openToaster({message: 'test toaster'}))
  }

  toaster(message: string){
    this._snackBar.open(message, 'OK', {
      duration: 3000
    }).afterDismissed().subscribe(() => {
      this._store.dispatch(clearToaster())
    })
  }

  getFloatLabel(): any{
    return 'Filter Tasks'
  }
}
