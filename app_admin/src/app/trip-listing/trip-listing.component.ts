import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip'
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(private tripDataService: TripDataService, private router: Router) {
    console.log('trip-listing constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    console.log('TripListingComponent#getTrips calling TripDataService#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
      .subscribe({
        next: (data: any) => {
          this.trips = data;
          if (this.trips.length > 0) {
            this.message = 'There are ' + this.trips.length + ' trips available';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }
        },
        error: (err: any) => {
          console.log('Error: ' + err);
        }
      });
  }


}