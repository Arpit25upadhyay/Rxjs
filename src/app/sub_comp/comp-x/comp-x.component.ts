import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-comp-x',
  templateUrl: './comp-x.component.html',
  styleUrls: ['./comp-x.component.scss']
})
export class CompXComponent implements OnInit {

  username: string;
  constructor(private _designUtility: DesignUtilityService) {
    this._designUtility.username.subscribe(res => {
      this.username = res;
    })
  }

  ngOnInit(): void {
  }
  
  onChange(uname) {
    this._designUtility.username.next(uname.value);
  }
}
