import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: any[] = [];

  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.applications = this.appService.getApplications();
  }
}
