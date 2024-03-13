import './TaskView.scss'
import {Task} from "../client/task";

export interface TaskViewProps {
    task: Task,
    onSelectTask: (task: Task) => void
}

export const TaskView = ({task, onSelectTask}: TaskViewProps) => {
    return (
        <div className="taskview" onClick={() => onSelectTask(task)}>
            <div className="taskview-header">
                <span className="taskview-header--title">{task.title}</span>
                <span className="taskview-header--score">{Math.round(task.score)}</span>
            </div>
            <div className="taskview-body">
                {task.description}
            </div>
        </div>
    )
}