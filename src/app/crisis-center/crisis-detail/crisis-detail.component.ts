import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Crisis } from 'src/app/shared/models/crisis';
import { CrisisCenterService } from 'src/app/shared/services/crisis-center.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {
  crisis?: Crisis;

  constructor(
    private route: ActivatedRoute,
    private crisisCenterService: CrisisCenterService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.crisisCenterService.getCrisis(id).subscribe(crisis => this.crisis = crisis);
  }

  goBack(): void {
    this.location.back();
  }
}
