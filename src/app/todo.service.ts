import { Injectable } from '@angular/core';
import { Todo } from './Model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private saveTodoList(list: Todo[]){
    localStorage.setItem('ngrx-todo', JSON.stringify(list))
  }

  getTodoList(){
    const listString = localStorage.getItem('ngrx-todo')
    let todoList:Todo[] = []
    if(listString){
      todoList = JSON.parse(listString)
    }

    return todoList
  }

  update(id: string | number, changes: Partial<Todo>){
    let todoList = this.getTodoList()

    let updatedTodo = todoList.find(dt => dt.id === id)
    const index = todoList.findIndex(dt => dt.id === id)
    if(updatedTodo){
      updatedTodo = {...updatedTodo, ...changes}
      todoList[index] = updatedTodo
    }

    this.saveTodoList(todoList)
  }

  add(todo: Todo){
    const todoList = this.getTodoList()
    this.saveTodoList([...todoList, todo])
  }

  delete(id: string | number){
    const todoList = this.getTodoList()
    const newTodoList = todoList.filter(dt => dt.id !== id)
    this.saveTodoList(newTodoList)
  }
}
