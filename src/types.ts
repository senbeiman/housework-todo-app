export interface PeriodicTodoBackend {
  id: number,
  name: string,
  last_updated_at: string | null,
  desired_interval_days: number
}
export interface PeriodicTodoSend {
  name: string,
  last_updated_at: Date | null,
  desired_interval_days: number
}
export type PeriodicTodoForm = Omit<PeriodicTodoBackend, "id" | "last_updated_at">
export interface PeriodicTodo {
  id: number,
  name: string,
  lastUpdatedAt: Date | null,
  lastUpdatedDistance: number | null,
  desiredIntervalDays: number,
  daysLeftToDesired: number | null
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