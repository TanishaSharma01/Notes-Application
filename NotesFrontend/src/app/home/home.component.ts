import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  loggedIn=false;
  // connection_refused='';
  constructor(public registerService: RegisterService, private router: Router, public statsService: StatsService) { 
    this.loggedIn = this.registerService.isLoggedIn();
  }
  noOfUser:any;
  noOfNotes:any;
  ngOnInit(): void {

    //get user count
    this.statsService.getCountUser()
    .subscribe(
      data=>
      {
        this.noOfUser=data;
        // console.log(data);
      },
      error=>
      {
        // this.connection_refused='Server Down, Please try after sometime';
        this.router.navigate(['/serverDown']).then(() => {
          window.location.reload();
        });
        console.log(error);
      }
    )

    //get notes count
  this.statsService.getCountNotes()
    .subscribe(
      data=>
      {
        this.noOfNotes=data;
        // console.log(data);
      },
      error=>
      {
        console.log(error);
      }
    )
  }

}
