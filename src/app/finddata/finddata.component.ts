import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-finddata',
  templateUrl: './finddata.component.html',
  styleUrls: ['./finddata.component.css']
})
export class FinddataComponent implements OnInit {

  myeditid = 0;
  states: any;
  divisions: any;
  selectedLevel: any;
  model: any;
  myArray: any[] = [];
  submitdatas: any;
  // submitdata:any;
  districts: any;
  taluka: any;
  villages: any;
  stateid: any;
  values: any;
  data: any;
  myid: any = 0;
  getdata: any;

  mystateid = 0;
  mydivisionid = 0;
  mydistrictid = 0;
  mytalukaid = 0;
  myvillageid = 0;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getdata("http://awsmaster.mahamining.com/master/states/GetState").subscribe((result: any) => {
      this.states = result.responseData;

    });
    this.getvalue();
  }

  statechanged(event: Event) {
    this.stateid = (<HTMLSelectElement>event.target).value;
    // alert(this.stateid);
    this.api.getdata("http://awsmaster.mahamining.com/master/divisions/" + this.stateid).subscribe((result: any) => {
      this.divisions = result.responseData;

    });
  }

  divisionchanged(event: Event) {
    let divisionid = (<HTMLSelectElement>event.target).value;
    this.api.getdata("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" + divisionid).subscribe((result: any) => {
      this.districts = result.responseData;

    })
  }
  districtchanged(event: Event) {
    let districtid = (<HTMLSelectElement>event.target).value;
    this.api.getdata("http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/" + districtid).subscribe((result: any) => {
      this.taluka = result.responseData;


    })

  }

  talukachanged(event: Event) {
    let talukaid = (<HTMLSelectElement>event.target).value;

    this.api.getdata("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" + talukaid).subscribe((result: any) => {
      this.villages = result.responseData;


    });

  }
  submit() {
    let stateselected = <HTMLSelectElement>document.getElementById("state");
    let state = stateselected.options[stateselected.selectedIndex].text;

    let divisionselected = <HTMLSelectElement>document.getElementById("division");
    let division = divisionselected.options[divisionselected.selectedIndex].text;

    let districtselected = <HTMLSelectElement>document.getElementById("district");
    let district = districtselected.options[districtselected.selectedIndex].text;

    let talukaselected = <HTMLSelectElement>document.getElementById("taluka");
    let taluka = talukaselected.options[talukaselected.selectedIndex].text;

    let villageselected = <HTMLSelectElement>document.getElementById("village");
    let village = villageselected.options[villageselected.selectedIndex].text;

    console.log(state + " " + division + " " + district + " " + taluka + " " + village);

    if (localStorage.getItem("submitdatas") != null) {
      this.getdata = JSON.parse(<any>localStorage.getItem("submitdatas"));
    }

    if (this.getdata != null) {
      for (let i = 0; i < this.getdata.length; i++) {
        if (this.myid <= this.getdata[i].id) {
          this.myid = this.getdata[i].id;
        }
        this.myid = this.myid + 1;
      }
    }
    else {
      this.myid = 0;
    }

    let submitdata = {
      id: this.myid,
      stateid: stateselected.value,
      state: state,
      divisionid: divisionselected.value,
      division: division,
      districtid: districtselected.value,
      district: district,
      talukaid: talukaselected.value,
      taluka: taluka,
      villageid: villageselected.value,
      village: village
    };

    this.submitdatas = new Array();
    if (localStorage.getItem("submitdatas") != null) {
      this.submitdatas = JSON.parse(<any>localStorage.getItem("submitdatas"))
    }
    if (this.myeditid == 0) {
      this.submitdatas.push(submitdata);
    }
    else {
      for (let i = 0; i < this.submitdatas.length; i++) {
        if (this.submitdatas[i].id != this.myeditid) {
          this.submitdatas[i] = submitdata;
        }
      }
    }
    this.myeditid = 0;
    localStorage.setItem("submitdatas", JSON.stringify(this.submitdatas));
    this.getvalue();
  }

  getvalue() {
    this.values = JSON.parse(<any>localStorage.getItem("submitdatas"))
  }


  deleteval(id: any) {

    if (confirm("sure to delete ?")) {
      this.values = JSON.parse(<any>localStorage.getItem("submitdatas"));
      let newtasks = new Array();

      for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].id != id) {
          newtasks.push(this.values[i]);
        }
      }
      localStorage.setItem("submitdatas", JSON.stringify(newtasks));
    }
    this.getvalue();
  }

  editval(id: any) {
    this.myeditid = id;
    this.values = JSON.parse(<any>localStorage.getItem("submitdatas"));
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].id == id) {
        this.mystateid = this.values[i].stateid;
        this.mydivisionid = this.values[i].divisionid;
        this.mydistrictid = this.values[i].districtid;
        this.mytalukaid = this.values[i].talukaid;
        this.myvillageid = this.values[i].villageid;
        //(<HTMLSelectElement>document.getElementById("state")).value = this.mystateid.toString();
        this.api.getdata("http://awsmaster.mahamining.com/master/divisions/" + this.mystateid).subscribe((result: any) => {
          this.divisions = result.responseData;
        });
        this.api.getdata("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" + this.mydivisionid).subscribe((result: any) => {
          this.districts = result.responseData;
        })
        this.api.getdata("http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/" + this.mydistrictid).subscribe((result: any) => {
          this.taluka = result.responseData;
        })
        this.api.getdata("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" + this.mytalukaid).subscribe((result: any) => {
          this.villages = result.responseData;

        });
      }
    }

  }

}
