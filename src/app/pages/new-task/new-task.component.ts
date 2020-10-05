import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: string;
  success: boolean = false;
  errorMessage: string;
  isError: boolean = false;

  @ViewChild('taskTitle') taskinput:ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createNewTask(title: string) {
    this.activeRoute.params.subscribe((params: Params) => {
      //
      this.listId = params.listId;
      this.taskService.createTask(this.listId, title).subscribe((res) => {
        //
        console.log(res);

        if(res != null) {
          if (res.hasOwnProperty('errors')) {
            this.isError = true;
            // this.errorMessage = res.errors.title.message;
            // console.log(res['errors'].title.message);
            if (res['errors'].title.message.search('required') != -1) {
              // console.log("required");
              this.errorMessage = "Title is required";
            }
            if (res['errors'].title.message.search('minimum') != -1) {
              // console.log("minimum");
              this.errorMessage = "Minimum length 5";
            }
          } else {
            this.isError = false;
            this.success = true;
            this.taskinput.nativeElement.value = '';
          }
        } else {
          this.success = false;
          this.isError = true;
        }

      });
    });
    // this.listId = this.activeRoute.snapshot.params['listId'];
    // console.log(this.listId);
    // console.log(title);

  }

  changeSuccessFlag() {
    this.success = !this.success;
  }

  changeErrorFlag() {
    this.isError = false;
  }

}
