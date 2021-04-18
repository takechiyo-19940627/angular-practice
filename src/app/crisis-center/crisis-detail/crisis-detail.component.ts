import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crisis } from 'src/app/shared/models/crisis';
import { CrisisCenterService } from 'src/app/shared/services/crisis-center.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {
  crisis?: Crisis;
  editedName: string;

  constructor(
    private route: ActivatedRoute,
    private crisisCenterService: CrisisCenterService,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.crisisCenterService.getCrisis(id).subscribe(crisis => this.crisis = crisis);
  }

  setEditedName(name: string): void {
    this.editedName = name;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.crisis.name = this.editedName;
    this.gotoCrises();
  }

  cancel(): void {
    this.gotoCrises();
  }

  private gotoCrises(): void {
    this.router.navigate(['../', {id: this.crisis.id, foo: 'foo'}], { relativeTo: this.route })
  }
}
