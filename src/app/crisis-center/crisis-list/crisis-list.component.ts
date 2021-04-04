import { Component, OnInit } from '@angular/core';
import { Crisis } from 'src/app/shared/models/crisis';
import { CrisisCenterService } from 'src/app/shared/services/crisis-center.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.scss']
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[] = [];

  constructor(
    private crisisCenterService: CrisisCenterService,
  ) {}

  ngOnInit(): void {
    this.getCrises();
  }

  getCrises(): void {
    this.crisisCenterService.getCrises().subscribe(crises => this.crises = crises);
  }
}
