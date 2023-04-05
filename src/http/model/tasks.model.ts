import { paths } from './todo.swagger';

export type GetAllTasksQuery = paths['/tasks']['get']['parameters']['query'];
export type GetAllTasksResponse = paths['/tasks']['get']['responses']['200']['content']['application/json'];
