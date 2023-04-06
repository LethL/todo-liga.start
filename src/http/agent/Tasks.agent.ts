import { BasicAgent } from './Basic.agent';
import {
  GetAllTasksResponse,
  GetAllTasksRequest,
  UpdateTaskRequest,
  UpdateTaskResponse,
  PostTaskRequest,
  PostTaskResponse,
  GetTaskResponse,
} from 'http/model/tasks.model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasksRequest(params?: GetAllTasksRequest): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>('/tasks', {
      params,
    });

    return data;
  }

  async updateTaskRequest(taskId: string, updateData?: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, updateData);

    return data;
  }

  async deleteTaskRequest(taskId: string): Promise<Response | void> {
    await this._http.delete(`/tasks/${taskId}`);
  }

  async addTaskRequest(Taskdata?: PostTaskRequest): Promise<PostTaskResponse> {
    const { data } = await this._http.post<UpdateTaskResponse>(`/tasks`, Taskdata);

    return data;
  }

  async getTaskRequest(taskId: string) {
    const { data } = await this._http.patch<GetTaskResponse>(`/tasks/${taskId}`);

    return data;
  }
}

export const TasksAgentRequest = new TasksAgent();
