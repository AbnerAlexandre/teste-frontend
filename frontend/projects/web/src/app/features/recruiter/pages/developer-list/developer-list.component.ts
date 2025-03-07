import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '@services';
import { Developer } from '@models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
})
export class DeveloperListComponent implements OnInit {
  developers: Developer[] = [];
  filterForm!: FormGroup;
  isLoading = false;

  constructor(
    private recruiterService: RecruiterService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      city: [''],
      email: [''],
      skills: [''],
    });

    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.isLoading = true;
  
    const filters = Object.entries(this.filterForm.value)
      .filter(([_, value]) => {
        if (typeof value === 'string') {
          return value.trim() !== '';
        }
        return value !== null && value !== undefined;
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
    this.recruiterService.getFilteredDevelopers(filters).subscribe({
      next: (response) => {
        this.developers = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getSkillsAsString(skills: string | string[]): string {
    return Array.isArray(skills) ? skills.join(', ') : skills;
  }

  onSubmit(): void {
    this.loadDevelopers();
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.loadDevelopers();
  }

  deleteDeveloper(id: string): void {
    if (!confirm('Deseja realmente excluir este developer?')) return;
  
    this.recruiterService.deleteDeveloper(id).subscribe({
      next: () => {
        this.developers = this.developers.filter(dev => dev._id !== id);
        alert('Developer excluído com sucesso!');
      },
      error: () => {
        alert('Erro ao excluir o developer.');
      }
    });
  }
}
