import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Season } from 'src/app/season';
import { TeamCity } from 'src/app/teamCity';
import { fn } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ipl',
  templateUrl: './ipl.component.html',
  styleUrls: ['./ipl.component.scss']
})
export class IPLComponent implements OnInit {

  constructor(private http: HttpClient) { }
  umpireFlag = false;
  teamFlag = false;
  venueFlag = false;
  afterTeamFlag = false;
  httpdata;
  orgData;
  umpireList = [];
  venueList = [];
  teamList = [];
  name = [];
  count = [];
  newArray = [];
  arr = [];
  venueCityArr = [];
  teamArray = [];
  sea: Season[];
  seaSelect: number;
  cities: TeamCity[];
  cityTeam: string;

  ngOnInit(): void {
    this.http.get('https://gist.githubusercontent.com/nitinknolder/676d2616e249eb7eb1d3004e4c7ef4d0/raw/7df7f77a97f88110eedb5c44d995944aa5de465e/matches.json')
      .subscribe(Response => {
        this.orgData = Response;
        this.displaydata(Response);
        console.log(Response);
      })

    this.sea = [
      { year: 2008 },
      { year: 2009 },
      { year: 2010 },
      { year: 2011 },
      { year: 2012 },
      { year: 2013 },
      { year: 2014 },
      { year: 2015 },
      { year: 2016 }];
    this.seaSelect = 2008;

    this.cities = [
      { city: 'Banglore', team: 'Royal Challengers Bangalore' },
      { city: 'Punjab', team: 'Kings XI Punjab' },
      { city: 'Delhi', team: 'Delhi Daredevils' },
      { city: 'Kolkata', team: 'Kolkata Knight Riders' },
      { city: 'Rajasthan', team: 'Rajasthan Royals' },
      { city: 'Mumbai', team: 'Mumbai Indians' },
      { city: 'Chennai', team: 'Chennai SumpireFlager Kings' },
      { city: 'Hyderabad', team: 'Deccan Chargers' },
      { city: 'Kerala', team: "Kochi Tuskers Kerala" },
      { city: 'Pune', team: "Pune Warriors" },
      { city: 'HyderabadNew', team: "Sunrisers Hyderabad" },
      { city: 'PuneNew', team: "Rising Pune SumpireFlagergiants" },
      { city: 'Gujarat', team: "Gujarat Lions" }];
    this.cityTeam = 'Banglore';
  }
  Season(value) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.arr = [];
    if (this.afterTeamFlag == false) {
      this.orgData.map(x => x.season == Number(value) ? this.arr.push(x) : x)
    }
    else if (this.afterTeamFlag == true) {
      this.teamArray;
      this.teamArray.map(x => x.season == Number(value) ? this.arr.push(x) : x)
    }
    this.displaydata(this.arr);
  }

  City(teamcity) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.afterTeamFlag = false;
    this.arr = [];
    var Team;
    this.cities.map(x => x.city == teamcity ? Team = x.team : x);
    this.orgData.map(x => x.team1 == Team ? this.arr.push(x) : x.team2 == Team ? this.arr.push(x) : x);
    this.displaydata(this.arr);
  }

  Umpire() {
    this.umpireFlag = true;
    this.venueFlag = false;
    this.teamFlag = false;
    this.afterTeamFlag = false;
    var count = 0;
    this.umpireList = [];
    this.orgData.map(x => this.umpireList.push(x.umpire1))
    this.newArray = this.umpireList.filter(this.onlyUnique);
    
    for (var j = 0; j < this.newArray.length; j++) {
      count = 0;
      for (var k = 0; k < this.umpireList.length; k++) {
        if (this.newArray[j] == this.umpireList[k]) {
          count++;
        }
      }
      this.name.push(this.newArray[j]);
      this.count.push(count);
    }
  }

  Venue() {
    this.venueFlag = true;
    this.umpireFlag = false;
    this.teamFlag = false;
    this.afterTeamFlag = false;
    this.venueList = [];
    this.orgData.map(x => this.venueList.push(x.venue));
    this.venueCityArr = this.venueList.filter(this.onlyUnique);
  }

  printTeam() {
    this.venueFlag = false;
    this.umpireFlag = false;
    this.afterTeamFlag = false;
    this.teamFlag = true;
    this.teamList = [];
    this.orgData.map(x => this.teamList.push(x.team1));
    this.teamList = this.teamList.filter(this.onlyUnique);
  }

  selectTeam(tname) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.afterTeamFlag = true;
    this.teamArray = [];
    this.arr = [];
    this.orgData.map(x => x.team1 == tname ? this.arr.push(x) : x.team2 == tname ? this.arr.push(x) : x);
    this.teamArray = this.arr;
    this.displaydata(this.arr);
  }

  displaydata(data) {
    this.httpdata = data;
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}


