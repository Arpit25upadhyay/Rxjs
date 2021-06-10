import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {

  obsMsg;

  constructor(private _designUtility: DesignUtilityService) { }

  ngOnInit(): void {

    //of example

    const Obs1 = of('arpit', 'manish', 'divya');
    Obs1.subscribe(res => {
      this._designUtility.print(res, 'elContainer');
    })

    const Obs2 = of({a:'arpit', b:'manish', c:'divya'});
    Obs2.subscribe(res => {
      this.obsMsg = res;
    })

    //from-array
    const Obs3 = from(['arpit', 'manish', 'divya']);
    Obs3.subscribe(res => {
      this._designUtility.print(res, 'elContainer3');
    })

    //from-Promise
    const promise = new Promise(resolve=>{
      setTimeout(()=>{
        resolve('Promise Resolved')
      },3000);
    })

    const Obs4 = from(promise);
    Obs4.subscribe(res => {
      this._designUtility.print(res, 'elContainer4');
    })

    //from-string
    const Obs5 = from('Welcome');
    Obs5.subscribe(res => {
      this._designUtility.print(res, 'elContainer5');
    })

  }

}
