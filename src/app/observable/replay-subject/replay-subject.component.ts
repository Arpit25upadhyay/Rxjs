import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.scss']
})
export class ReplaySubjectComponent implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }

  user1List =[
    'Angular1',
    'Angular2'
  ];
  user2List =[];
  user3List =[];
  ngOnInit(): void {
    this._designUtility.videoEmit.subscribe(res=>{
      console.log(res);
      this.user1List.push(res);
    })
  }

  onvideoAdd(video){
    console.log(video.value);
    this._designUtility.videoEmit.next(video.value);
  }

}
