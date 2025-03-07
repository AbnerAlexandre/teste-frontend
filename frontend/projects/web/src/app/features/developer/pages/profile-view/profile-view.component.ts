import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperService } from '@services';
import { Developer } from '@models';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent implements OnInit {
  developer!: Developer;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.developerService.getById(id).subscribe((request) => {
      const { data } = request;
      this.developer = data;
    });
  }

  editDeveloper() {
    this.router.navigate(['/developer/edit', this.developer._id]);
  }
}