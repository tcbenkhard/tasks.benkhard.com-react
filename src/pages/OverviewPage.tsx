import {TaskListView} from "../components/TaskListView";
import {TaskList} from "../model/TaskList";
import './OverviewPage.scss'
import {Task} from "../model/Task";
import {useCallback, useEffect, useState} from "react";
import {TaskDetailsDialog} from "../components/dialog/TaskDetailsDialog";

const lists: Array<TaskList> = [{
    "id": "1371cc81-82cb-44b9-a198-e533a6b61a0e",
    "title": "Test lijst",
    "owner": "tcbenkhard@gmail.com",
    "createdAt": "2024-03-05T13:55:48.992Z",
    "tasks": [
        {
            "id": "task#0d00e43f-4b39-4452-b83a-01d0ce788ad5",
            "title": "My Fifth Task",
            "description": "This is my very fifth task",
            "priority": 4,
            "createdBy": "tcbenkhard@gmail.com",
            "createdAt": "2024-03-07",
            "type": "flexible",
            "schedule": {
                "interval": 1,
                "period": "weeks"
            },
            "dueDate": "2024-02-23T00:00:00.000Z",
            "lastCompleted": "2024-02-16",
            "score": 13.088136797619047
        },
        {
            "id": "task#4e005fc5-51e2-4ace-a5b0-b7bcdd1208ee",
            "title": "My Sixth Task",
            "description": "This is my very sixth task",
            "priority": 1,
            "createdBy": "tcbenkhard@gmail.com",
            "createdAt": "2024-03-07",
            "type": "flexible",
            "schedule": {
                "interval": 1,
                "period": "weeks"
            },
            "dueDate": "2024-02-23T00:00:00.000Z",
            "lastCompleted": "2024-02-16",
            "score": 8.725424682539682
        },
        {
            "id": "task#67cfca6c-fd5b-4bde-a628-e434c8c0808e",
            "title": "My First Task",
            "description": "This is my very first task",
            "priority": 4,
            "createdBy": "tcbenkhard@gmail.com",
            "createdAt": "2024-03-07",
            "type": "flexible",
            "schedule": {
                "interval": 2,
                "period": "weeks"
            },
            "dueDate": "2024-03-07T12:00:00.000Z",
            "lastCompleted": "2024-02-22",
            "score": 4.828755807471264
        },
        {
            "id": "task#6b3428f6-18e7-4df2-9798-2188d9d95f5e",
            "title": "My Third Task",
            "description": "This is my very third task",
            "priority": 4,
            "createdBy": "tcbenkhard@gmail.com",
            "createdAt": "2024-03-07",
            "type": "flexible",
            "schedule": {
                "interval": 2,
                "period": "weeks"
            },
            "dueDate": "2024-03-07T12:00:00.000Z",
            "lastCompleted": "2024-02-22",
            "score": 4.828755810344828
        },
        {
            "id": "task#c189af8a-f51c-422d-b476-fe3f210bbad2",
            "title": "My Second Task",
            "description": "This is my very second task",
            "priority": 4,
            "createdBy": "tcbenkhard@gmail.com",
            "createdAt": "2024-03-07",
            "type": "flexible",
            "schedule": {
                "interval": 2,
                "period": "weeks"
            },
            "dueDate": "2024-03-07T12:00:00.000Z",
            "lastCompleted": "2024-02-22",
            "score": 4.828755813218391
        }
    ]
}]
export const OverviewPage = () => {
    const [selectedTask, setSelectedTask] = useState<Task>();

    const onSelectTask = useCallback(
        (task: Task) => {
            console.log(`Selected! ${task.title}`)
            setSelectedTask(task)
        },
        [setSelectedTask],
    );


    return (
        <div className={'overview'}>
            { selectedTask ? <TaskDetailsDialog task={selectedTask} onCloseDialog={() => setSelectedTask(undefined)}/> : ''}
            {lists.map(list => <TaskListView list={list} onSelectTask={task => onSelectTask(task)} key={list.id} />)}
        </div>
    )
}