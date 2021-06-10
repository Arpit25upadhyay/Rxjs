import { Component, OnInit } from '@angular/core';
import { from, interval, of, Subscription } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-to-array',
  templateUrl: './to-array.component.html',
  styleUrls: ['./to-array.component.scss']
})
export class ToArrayComponent implements OnInit {

  Users = [
    {name: 'Arpit', skill: 'Data Science'},
    {name: 'Mayank', skill: 'DataBase'},
    {name: 'Nishi', skill: 'Python'}
  ]

  constructor() { }
  srcSub : Subscription;
  a;
  c;

  ngOnInit(): void {
    //Ex-1
    const src = interval(1000);
    this.srcSub = src.pipe(take(5),toArray())
    .subscribe(res=>{
      this.a = res;
    })

    //Ex-2
    const src2 = from(this.Users);
    src2.pipe(toArray())
    .subscribe(res => {
      console.log(res);
    })

    //Ex-3
    const src3 = of('Arpit','Manish','Nishi');
    src3.pipe(toArray())
    .subscribe(res=>{
      this.c = res;
    })
  }
}
