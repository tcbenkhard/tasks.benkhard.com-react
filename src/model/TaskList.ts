import {Task} from "./Task";

export interface TaskList {
    id: string
    title: string
    owner: string
    createdAt: string
    tasks: Array<Task>
}