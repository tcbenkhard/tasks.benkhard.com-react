import {TaskList} from "../client/task-list";
import './TaskListView.scss'
import {TaskView} from "./TaskView";
import {Task} from "../client/task";
import {useContext, useEffect, useState} from "react";
import {TaskClient} from "../client/task-client";
import {AuthTokenContext} from "../App";

interface TaskListProps {
    list: TaskList,
    onSelectTask: (task: Task) => void
}

const taskClient = new TaskClient("https://2dw7xx67oj.execute-api.eu-west-1.amazonaws.com/prod");
const sortByScore = (taskA: Task, taskB: Task) => taskB.score - taskA.score

export const TaskListView = ({list, onSelectTask}: TaskListProps) => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const {accessToken, refreshToken} = useContext(AuthTokenContext);

    useEffect(() => {
        taskClient.setAuthTokens(accessToken, refreshToken)
    }, [accessToken, refreshToken]);

    useEffect(() => {
        taskClient.getList(list.id).then((list) => {
            console.log('received tasks: ', tasks)
            setTasks(list.tasks.sort(sortByScore))
        })
    }, [list]);


    return (
        <div className={'tasklist'}>
            <div className="tasklist-header">
                <span className="tasklist-header--title">{list.title}</span>
            </div>
            <div className="tasklist-body">
                {tasks.map(task => <TaskView task={task} onSelectTask={onSelectTask} key={task.id}/>)}
            </div>
        </div>
    )
}