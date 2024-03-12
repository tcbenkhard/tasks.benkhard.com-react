export interface Task {
    id: string,
    title: string,
    description: string,
    priority: number,
    createdBy: string,
    createdAt: string,
    type: string,
    schedule: {
        "interval": number,
        "period": "days" | "weeks" | "months" | "years"
    },
    dueDate: string,
    lastCompleted: string,
    score: number
}