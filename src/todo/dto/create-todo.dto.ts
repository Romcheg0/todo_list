export class CreateTodoDto{
  readonly text: string
  readonly isCompleted: boolean
  readonly userId: number
  groupId?: number
}