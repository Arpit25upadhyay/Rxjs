import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Season } from 'src/app/season';
import { TeamCity } from 'src/app/teamCity';
import { IplData } from 'src/app/iplData';
import { Observable } from 'rxjs';
import { Venue } from 'src/app/venue';
import { Team } from 'src/app/team';

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
  orgData: IplData[];
  umpireList: Array<string> = [];
  umpireName: Array<string> = [];
  umpireCount: Array<number> = [];
  uniqueUmpireArr: Array<string> = [];
  arr: Array<any> = [];
  //venueList: Array<string> = [];
  venueList: Venue[] = [];
  //venueCityArr: Array<string> = [];
  venueCityArr: Venue[] = [];
  teamList: Array<string> = [];
  //teamList: Team[] = [];
  teamArray: Array<any> = [];
  //teamArray: Team[] = [];
  seasonList: Season[];
  seasonSelect: number;
  cities: TeamCity[];
  cityTeam: string;

  ngOnInit(): void {
    this.getData().subscribe((Response) => {
      this.orgData = Response;
      this.displayData(Response);
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
  getData(): Observable<IplData[]> {
    return this.http.get<IplData[]>('https://gist.githubusercontent.com/nitinknolder/676d2616e249eb7eb1d3004e4c7ef4d0/raw/7df7f77a97f88110eedb5c44d995944aa5de465e/matches.json')
  }

  season(value) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.arr = [];
    if (this.selectTeamFlag == false) {
      this.orgData.map(val => val.season == Number(value) ? this.arr.push(val) : val)
    }
    else if (this.selectTeamFlag == true) {
      this.teamArray;
      this.teamArray.map(val => val.season == Number(value) ? this.arr.push(val) : val)
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
    this.cities.map(val => val.city == teamcity ? Team = val.team : val);
    this.orgData.map(val => val.team1 == Team ? this.arr.push(val) : val.team2 == Team ? this.arr.push(val) : val);
    this.displayData(this.arr);
  }

  umpire() {
    this.umpireFlag = true;
    this.venueFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = false;
    var count = 0;
    this.umpireList = [];
    this.orgData.map(val => this.umpireList.push(val.umpire1))
    this.uniqueUmpireArr = this.umpireList.filter(this.onlyUnique);
    for (var index = 0; index < this.uniqueUmpireArr.length; index++) {
      count = 0;
      for (var orgIndex = 0; orgIndex < this.umpireList.length; orgIndex++) {
        if (this.uniqueUmpireArr[index] == this.umpireList[orgIndex]) {
          count++;
        }
      }
      this.umpireName.push(this.uniqueUmpireArr[index]);
      this.umpireCount.push(count);
    }
  }

  venue() {
    this.venueFlag = true;
    this.umpireFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = false;
    this.venueList = [];
    this.orgData.map(val => {
      var venueObj = new Venue();
      venueObj.venue = val.venue;
      this.venueList.push(venueObj);
    });
    this.venueCityArr = this.venueList.filter(this.onlyUnique);
  }

  printTeam() {
    this.venueFlag = false;
    this.umpireFlag = false;
    this.selectTeamFlag = false;
    this.teamFlag = true;
    this.teamList = [];
    this.orgData.map(val => this.teamList.push(val.team1));
    this.teamList = this.teamList.filter(this.onlyUnique);
  }

  selectTeam(tname) {
    this.umpireFlag = false;
    this.venueFlag = false;
    this.teamFlag = false;
    this.selectTeamFlag = true;
    this.teamArray = [];
    this.arr = [];
    this.orgData.map(val => val.team1 == tname ? this.arr.push(val) : val.team2 == tname ? this.arr.push(val) : val);
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


