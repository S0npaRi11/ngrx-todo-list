export interface Todo {
  name: string,
  description?:string,
  isImportant: boolean,
  createdAt: Date,
  completedAt?: Date,
  completeBy?: Date,
  id: string,
  isComplete?: boolean
}
