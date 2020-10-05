import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewList(text: string) {
    this.taskService.createList(text).subscribe((res: any) => {
      console.log(res);
      // res._id
      // this.router.navigateByUrl('/lists');
    });
  }

}
