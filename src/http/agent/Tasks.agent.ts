import { BasicAgent } from './Basic.agent';
import { GetAllTasksResponse, GetAllTasksQuery } from 'http/model/tasks.model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasksRequest(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>('/tasks', {
      params,
    });

    return data;
  }
}

export const TasksAgentRequest = new TasksAgent();
