import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit {

  obsMsg;
  videoSubs : Subscription;
  constructor(private _designUtility: DesignUtilityService){ }

  ngOnInit(): void {

    //const broadCastVideo =  interval(1000);
    //timer(delay,interval)
    const broadCastVideo =  timer(3000, 1000);

    this.videoSubs = broadCastVideo.subscribe(res=>{
      console.log(res);
      this.obsMsg = 'Video' + res;
      this._designUtility.print(this.obsMsg,'elContainer1');
      this._designUtility.print(this.obsMsg,'elContainer2');
      this._designUtility.print(this.obsMsg,'elContainer3')

      if(res >= 5){
        this.videoSubs.unsubscribe();
      }
    })
  }

}
