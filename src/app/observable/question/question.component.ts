import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }
  arrNew = [];
  arrCreate = [];

  ngOnInit(): void {
    this.obsCreate();
    this.obsNew();
  }

  obsCreate() {
    const obs = Observable.create((observer) => {
      let count = 1;
      observer.next(++count);
      observer.next('abc');
      setInterval(() => {
        observer.next(++count);
        observer.complete();
      }, 3000);
    });

    obs.subscribe({
      next: (data) => this.insertValCreate(data),
      error: (err: any) => this.insertValCreate(err),
      complete: () => this.insertValCreate('Done')
    })
  }

  obsNew() {
    const obsNew = new Observable((observer) => {
      let count = 9;
      observer.next(++count);
      observer.next('abc');
      setInterval(() => {
        observer.next(++count);
        observer.complete();
      }, 3000);
    });

    obsNew.subscribe({
      next: (data) => this.insertValNew(data),
      error: (err: any) => this.insertValNew(err),
      complete: () => this.insertValNew('Done')
    })
  }

  insertValCreate(data) {
    this.arrCreate.push(data);
  }
  insertValNew(data){
    this.arrNew.push(data);
  }
}
