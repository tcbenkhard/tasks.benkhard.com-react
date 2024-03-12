import {TaskList} from "../model/TaskList";
import './TaskListView.scss'
import {TaskView} from "./TaskView";
import {Task} from "../model/Task";

interface TaskListProps {
    list: TaskList,
    onSelectTask: (task: Task) => void
}

export const TaskListView = ({list, onSelectTask}: TaskListProps) => {
    return (
        <div className={'tasklist'}>
            <div className="tasklist-header">
                <span className="tasklist-header--title">{list.title}</span>
            </div>
            <div className="tasklist-body">
                {list.tasks.map(task => <TaskView task={task} onSelectTask={onSelectTask} key={task.id}/>)}
            </div>
        </div>
    )
}