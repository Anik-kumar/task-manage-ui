import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  paramsId: any;
  tasks: Task[];
  isError: boolean = false;

  constructor(
    private taskService: TaskService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe( (params: Params) => {
      //
      console.log(params);
      this.paramsId = params.listId;
      this.taskService.getTasks(this.paramsId).subscribe((result: Task[]) => {
        this.tasks = result;

        console.log(result);
        // console.log(this.tasks);
      });
    });

    this.taskService.getLists().subscribe( (lists: List[]) => {
      //
      this.lists = lists;
      // console.log(lists);
    });
  }

  redirectToNewTask() {
    if(this.paramsId == null) {
      //
      this.isError = true;
    }else {
      this.isError = false;
      this.router.navigateByUrl(`/lists/${this.paramsId}/new-task`);
    }
  }

  changeIsError() {
    if(this.isError) {
      this.isError = false;
    }
  }

  completeTask(task: Task) {
    // alert(e.target);
    // if(!task.completed)
    console.log(task);
    this.taskService.completeTask(task).subscribe(() => {
      console.log("Task Completed");
      task.completed = true;
    });
  }


}
