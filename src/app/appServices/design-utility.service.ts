import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  exclusive = new Subject <boolean>();
  //username = new Subject <string>();
  username = new BehaviorSubject <string>('Arpit');

  videoEmit = new ReplaySubject<string>(5);
  
  constructor() { }

  print(val, containerId) {
    let el = document.createElement('li');
    el.innerText = val;
    document.getElementById(containerId).appendChild(el);
  }


}
