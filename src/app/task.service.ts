
import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private webReq: WebRequestService) { }

  createList(title: string) {
    //
    return this.webReq.post('lists', { title});
  }

  getLists() {
    return this.webReq.get('lists');
  }

  getTasks(listId: string) {
    return this.webReq.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string) {
    return this.webReq.post(`lists/${listId}/tasks`, { task: title});
  }

  completeTask(task: Task) {
    console.log(task._listId);
    console.log(task._id);
    return this.webReq.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: true
    });
  }


}
