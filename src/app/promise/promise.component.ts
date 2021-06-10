import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  constructor() { }

  fordAvail() {
    return true;
  }

  lamboAvail() {
    return false;
  }

  promiseVal;

  ford = {
    brand: 'Ford',
    model: 'Mustang',
    Year: 2012
  }

  lambo = {
    brand: 'lamborghini',
    model: 'urus',
    Year: 2019
  }

  notAvail = {
    brand: 'NA'
  }

  ngOnInit(): void {
    let buyCar = new Promise((resolve, reject) => {
      //resolve('Promise is resolved');
      //reject("Ye to ho gaya reject");

      if (this.fordAvail()) {
        return setTimeout(() => {
          resolve(JSON.stringify(this.ford))
        }, 3000)

      } else if (this.lamboAvail()) {
        return setTimeout(() => {
          resolve(JSON.stringify(this.lambo))
        }, 3000)
      } else {
        return setTimeout(() => {
          reject(JSON.stringify(this.notAvail))
        }, 3000)
      }
    });

    buyCar.then(res => {
      this.promiseVal = res;
    }).catch(res => {
      this.promiseVal = res;
    });
  }
}


