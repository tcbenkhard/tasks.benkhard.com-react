import {Dialog} from "./Dialog";
import {Task} from "../../client/task";
import './TaskDetailDialog.scss'
import {Stat} from "../Stat";
import {DateTime} from 'luxon'

export interface TaskDetailsDialogProps {
    onCloseDialog: () => void
    task: Task
    onCompleteClicked: () => void
}

export const TaskDetailsDialog = ({onCloseDialog, task, onCompleteClicked}: TaskDetailsDialogProps) => {
    return (
        <Dialog onClickOutside={onCloseDialog}>
            <div className="task-dialog-header">
                {task.title}
            </div>
            <div className="task-dialog-body">
                <div className="task-dialog-body--stats">
                    <Stat name={'Created'} value={DateTime.fromISO(task.createdAt).toFormat('dd LLLL yyyy')}/>
                    <Stat name={'Due'} value={DateTime.fromISO(task.dueDate).toFormat('dd LLLL yyyy')}/>
                    <Stat name={'Priority'} value={task.priority}/>
                </div>
                <div className="task-dialog-body--schedule">
                    {task.type === 'flexible' ? <Stat name={'Schedule'} value={`Every ${task.schedule.interval} ${task.schedule.period}`} /> : ''}
                </div>
                <div className="task-dialog-body--description">
                    {task.description}
                </div>
                <div className="task-dialog-body--control">
                    <button onClick={onCompleteClicked}>Complete</button>
                </div>
            </div>
        </Dialog>
    )
}