import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Season } from 'src/app/season';
import { TeamCity } from 'src/app/teamCity';
import { Umpire } from 'src/app/umpire';

@Component({
  selector: 'app-ipl',
  templateUrl: './ipl.component.html',
  styleUrls: ['./ipl.component.scss']
})
export class IPLComponent implements OnInit {

  constructor(private http: HttpClient) { }
  up = true;
  vflag = false;
  httpdata;
  name = [];
  count = [];
  umpArr = [];
  venueArr =[];
  newArr = [];
  arr = [];
  Ump: Umpire[];
  sea: Season[];
  cities: TeamCity[];
  cityTeam: string;
  seaSelect: number;
  venueCityArr = [];
  orgData;

  ngOnInit(): void {
    this.http.get('https://gist.githubusercontent.com/nitinknolder/676d2616e249eb7eb1d3004e4c7ef4d0/raw/7df7f77a97f88110eedb5c44d995944aa5de465e/matches.json')
      .subscribe(Response => {
        this.orgData = Response;
        this.displaydata(Response);
      })
    this.sea = [{ year: 2008 }, { year: 2009 }, { year: 2010 }, { year: 2011 }, { year: 2012 },
    { year: 2013 }, { year: 2014 }, { year: 2015 }, { year: 2016 }];
    this.seaSelect = 2008;

    this.cities = [{ city: 'Royal Challengers Bangalore' }, { city: 'Kings XI Punjab' }, { city: 'Delhi Daredevils' },
    { city: 'Kolkata Knight Riders' }, { city: 'Rajasthan Royals' }, { city: 'Mumbai Indians' }, { city: 'Chennai Super Kings' },
    { city: 'Deccan Chargers' }];
    this.cityTeam = 'Chennai Super Kings';

  }

  Season(value) {
    this.arr = [];
    for (var key in this.orgData) {
      if (this.orgData.hasOwnProperty(key)) {
        var val = this.orgData[key];
        if (val.season == Number(value)) {
          this.arr.push(val);
        }
      }
    }
    this.displaydata(this.arr);
  }

  City(team) {
    this.arr = [];
    for (var key in this.orgData) {
      if (this.orgData.hasOwnProperty(key)) {
        var val = this.orgData[key];
        if (val.team1 == (team)) {
          this.arr.push(val);
        } else if (val.team2 == (team)) {
          this.arr.push(val);
        }
      }
    }
    this.displaydata(this.arr);
  }

  Umpire() {
    this.up = false;
    var count = 0;
    this.umpArr = [];
    for (var key in this.orgData) {
      if (this.orgData.hasOwnProperty(key)) {
        var val = this.orgData[key];
        {
          this.umpArr.push(val.umpire1);
        }
      }
    }
    console.log(this.umpArr.filter(this.onlyUnique));
    this.newArr = this.umpArr.filter(this.onlyUnique);
    for (var j = 0; j < this.newArr.length; j++) {
      count = 0;
      for (var k = 0; k < this.umpArr.length; k++) {
        if (this.newArr[j] == this.umpArr[k]) {
          count++;
        }
      }
      this.name.push(this.newArr[j]);
      this.count.push(count);
    }
    this.Ump = [{ Name: this.newArr[j], count: count }];
  }

  Venue() {
    this.vflag = true;
    this.up = false;
    var count = 0;
    this.venueArr = [];
    for (var key in this.orgData) {
      if (this.orgData.hasOwnProperty(key)) {
        var val = this.orgData[key];
        {
          this.venueArr.push(val.venue);
        }
      }
    }
    this.venueCityArr = this.venueArr.filter(this.onlyUnique);
  }

  displaydata(data) {
    this.httpdata = data;
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}


