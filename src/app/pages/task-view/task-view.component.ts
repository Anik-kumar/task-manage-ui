import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  paramsId: any;
  tasks: any;
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
      this.taskService.getTasks(this.paramsId).subscribe((result) => {
        this.tasks = result;

        console.log(result);
        // console.log(this.tasks);
      });
    });

    this.taskService.getLists().subscribe( (lists) => {
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


}
