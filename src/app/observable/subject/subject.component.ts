import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  username:string;

  constructor(private _designUtility : DesignUtilityService) {
    this._designUtility.username.subscribe(res=>{
      this.username = res;
    })
   }
  
  ngOnInit(): void {
    this._designUtility.exclusive.next(true);
  }

  ngOnDestroy(): void {
    this._designUtility.exclusive.next(false);
  }



}
