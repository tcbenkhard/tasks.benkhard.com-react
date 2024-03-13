import {TaskListView} from "../components/TaskListView";
import {TaskList} from "../client/task-list";
import './OverviewPage.scss'
import {Task} from "../client/task";
import {useCallback, useContext, useEffect, useState} from "react";
import {TaskDetailsDialog} from "../components/dialog/TaskDetailsDialog";
import {TaskClient} from "../client/task-client";
import {AuthTokenContext} from "../App";

const taskClient = new TaskClient("https://2dw7xx67oj.execute-api.eu-west-1.amazonaws.com/prod");

export const OverviewPage = () => {
    const [selectedTask, setSelectedTask] = useState<Task>();
    const {accessToken, refreshToken} = useContext(AuthTokenContext);
    const [lists, setLists] = useState<Array<TaskList>>([])

    useEffect(() => {
        taskClient.setAuthTokens(accessToken, refreshToken)
    }, [accessToken, refreshToken]);

    const reload = useCallback(
        () => {
            console.log('Reloading...')
            taskClient.getLists().then(setLists)
        },
        [],
    );

    useEffect(reload, [reload]);

    const handleCompleteClicked = useCallback(() => {
        taskClient.completeTask(selectedTask!.listId, selectedTask!.id)
            .then(() => setSelectedTask(undefined))
            .then(() => reload())
    }, [selectedTask, reload])

    const onSelectTask = useCallback(
        (task: Task) => {
            console.log(`Selected! ${task.title}`)
            setSelectedTask(task)
        },
        [setSelectedTask],
    );


    return (
        <div className={'overview'}>
            { selectedTask ? <TaskDetailsDialog task={selectedTask} onCompleteClicked={handleCompleteClicked} onCloseDialog={() => setSelectedTask(undefined)}/> : ''}
            {lists.map(list => <TaskListView list={list} onSelectTask={task => onSelectTask(task)} key={list.id} />)}
        </div>
    )
}