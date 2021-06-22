import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Season } from 'src/app/season';
import { TeamCity } from 'src/app/teamCity';
import { IData } from 'src/app/iplData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ipl',
  templateUrl: './ipl.component.html',
  styleUrls: ['./ipl.component.scss']
})
export class IPLComponent implements OnInit {

  constructor(private http: HttpClient) { }
  umpireFlag: boolean = false;
  teamFlag: boolean = false;
  venueFlag: boolean = false;
  selectTeamFlag: boolean = false;
  httpdata;
  orgData: IData[];
  umpireList: Array<string> = [];
  venueList: Array<string> = [];
  teamList: Array<string> = [];
  umpireName: Array<string> = [];
  umpireCount: Array<number> = [];
  tempArray: Array<string> = [];
  arr: Array<any> = [];
  venueCityArr: Array<string> = [];
  teamArray: Array<any> = [];
  seasonList: Season[];
  seasonSelect: number;
  cities: TeamCity[];
  cityTeam: string;

  ngOnInit(): void {

    this.getData().subscribe((Response) => {
        this.orgData = Response;
        this.displayData(Response);
        console.log(Response);
      })

    this.seasonList = [
      { year: 2008 },
      { year: 2009 },
      { year: 2010 },
      { year: 2011 },
      { year: 2012 },
      { year: 2013 },
      { year: 2014 },
      { year: 2015 },
      { year: 2016 }];
    this.seasonSelect = 2008;

    this.cities = [
      { city: 'Banglore', team: 'Royal Challengers Bangalore' },
      { city: 'Punjab', team: 'Kings XI Punjab' },
      { city: 'Delhi', team: 'Delhi Daredevils' },
      { city: 'Kolkata', team: 'Kolkata Knight Riders' },
      { city: 'Rajasthan', team: 'Rajasthan Royals' },
      { city: 'Mumbai', team: 'Mumbai Indians' },
      { city: 'Chennai', team: 'Chennai Super Kings' },
      { city: 'Hyderabad', team: 'Deccan Chargers' },
      { city: 'Kerala', team: "Kochi Tuskers Kerala" },
      { city: 'Pune', team: "Pune Warriors" },
      { city: 'HyderabadNew', team: "Sunrisers Hyderabad" },
      { city: 'PuneNew', team: "Rising Pune Supergiants" },
      { city: 'Gujarat', team: "Gujarat Lions" }];
    this.cityTeam = 'Banglore';
  }

  getData(): Observable<IData[]> {
    return this.http.get<IData[]>('https://gist.githubusercontent.com/nitinknolder/676d2616e249eb7eb1d3004e4c7ef4d0/raw/7df7f77a97f88110eedb5c44d995944aa5de465e/matches.json')
  }

  season(value) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.arr = [];
    if (this.selectTeamFlag == false) {
      this.orgData.map(x => x.season == Number(value) ? this.arr.push(x) : x)
    }
    else if (this.selectTeamFlag == true) {
      this.teamArray;
      this.teamArray.map(x => x.season == Number(value) ? this.arr.push(x) : x)
    }
    this.displayData(this.arr);
  }

  city(teamcity) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = false;
    this.arr = [];
    var Team;
    this.cities.map(x => x.city == teamcity ? Team = x.team : x);
    this.orgData.map(x => x.team1 == Team ? this.arr.push(x) : x.team2 == Team ? this.arr.push(x) : x);
    this.displayData(this.arr);
  }

  umpire() {
    this.umpireFlag = true;
    this.venueFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = false;
    var count = 0;
    this.umpireList = [];
    this.orgData.map(x => this.umpireList.push(x.umpire1))
    this.tempArray = this.umpireList.filter(this.onlyUnique);

    for (var j = 0; j < this.tempArray.length; j++) {
      count = 0;
      for (var k = 0; k < this.umpireList.length; k++) {
        if (this.tempArray[j] == this.umpireList[k]) {
          count++;
        }
      }
      this.umpireName.push(this.tempArray[j]);
      this.umpireCount.push(count);
    }
  }

  venue() {
    this.venueFlag = true;
    this.umpireFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = false;
    this.venueList = [];
    this.orgData.map(x => this.venueList.push(x.venue));
    this.venueCityArr = this.venueList.filter(this.onlyUnique);
  }

  printTeam() {
    this.venueFlag = false;
    this.umpireFlag = false;
    this.selectTeamFlag = false;
    this.teamFlag = true;
    this.teamList = [];
    this.orgData.map(x => this.teamList.push(x.team1));
    this.teamList = this.teamList.filter(this.onlyUnique);
  }

  selectTeam(tname) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = true;
    this.teamArray = [];
    this.arr = [];
    this.orgData.map(x => x.team1 == tname ? this.arr.push(x) : x.team2 == tname ? this.arr.push(x) : x);
    this.teamArray = this.arr;
    this.displayData(this.arr);
  }

  displayData(data) {
    this.httpdata = data;
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}


