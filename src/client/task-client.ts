import {AuthenticateResponse} from "./authenticate-response";
import {TaskList} from "./task-list";
import {Task} from "./task";

export class ApiError extends Error {
    errorCode: string
    message: string
    statusCode: number
    constructor(statusCode: number, errorCode: string, message: string) {
        super(message);
        this.errorCode = errorCode
        this.message = message
        this.statusCode = statusCode
    }
}

export class TaskClientError extends Error {}

export class TaskClient {
    private baseUrl: string
    private accessToken?: string
    private refreshToken?: string

    constructor(baseUrl: string, accessToken?: string, refreshToken?: string) {
        this.baseUrl = baseUrl
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    authenticate = async (username: string, password: string): Promise<AuthenticateResponse> => {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            }
        })
        const authResponse = await response.json() as AuthenticateResponse
        this.setAuthTokens(authResponse.accessToken, authResponse.refreshToken)
        return authResponse
    }

    private request = async (method: string, path: string, body?: string) => {
        if(!this.accessToken) throw new TaskClientError('Authenticate before using taskClient')
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            }
        })

        if(!response.ok) {
            const responseBody = await response.json()
            throw new ApiError(response.status, responseBody.errorCode, responseBody.reason)
        }

        return response
    }

    private requestAndParse = async <T> (method: string, path: string, body?: string): Promise<T> => {
        const response = await this.request(method, path, body)
        return await response.json() as T
    }

    setAuthTokens = (accessToken?: string, refreshToken?: string) => {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    getLists = async () => {
        return this.requestAndParse<Array<TaskList>>('GET', '/lists')
    }

    getList = async (listId: string) => {
        return this.requestAndParse<TaskList>('get', `/lists/${listId}`)
    }

    completeTask = async(listId: string, taskId: string) => {
        await this.request('POST', `/lists/${listId}/tasks/${taskId}/complete`)
    }
}