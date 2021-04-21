import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';
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
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.getCrisis();
    this.route.data.subscribe((data: { crisis: Crisis }) => {
      this.editedName = data.crisis.name;
      this.crisis = data.crisis;
    });
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

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.crisis || this.crisis.name === this.editedName) {
      return true;
    }

    return this.dialogService.confirm('Discord changes?');
  }

  private gotoCrises(): void {
    this.router.navigate(['../', {id: this.crisis.id, foo: 'foo'}], { relativeTo: this.route })
  }
}
