export interface PeriodicTodoBackend {
  id: number,
  name: string,
  last_updated_at: string,
  desired_interval_days: number
}
export interface PeriodicTodoSend {
  name: string,
  last_updated_at: Date,
  desired_interval_days: number
}
export type PeriodicTodoForm = Omit<PeriodicTodoBackend, "id" | "last_updated_at">
export interface PeriodicTodo {
  id: number,
  name: string,
  lastUpdatedAt: Date,
  lastUpdatedDistance: number,
  desiredIntervalDays: number,
  daysLeftToDesired: number
}
export interface TemporaryTodoBackend {
  id: number,
  name: string,
  deadline: string
}
export type TemporaryTodoForm = Omit<TemporaryTodoBackend, "id">
export interface TemporaryTodo {
  id: number,
  name: string,
  deadline: Date,
  minutesLeftToDeadline: number,
  distanceToDeadline: string
}