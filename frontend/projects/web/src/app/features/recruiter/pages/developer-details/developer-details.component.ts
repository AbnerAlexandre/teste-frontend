import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecruiterService, DeveloperService } from '@services';
import { Developer, Feedback } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
})
export class DeveloperDetailsComponent implements OnInit {
  developer!: Developer;
  form!: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private recruiterService: RecruiterService,
    private ds: DeveloperService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadDeveloper();

    this.form = this.fb.group({
      recruiterName: ['', [Validators.required, Validators.minLength(5)]],
      comment: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  loadDeveloper(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;

    this.recruiterService.getById(id).subscribe((request) => {
      this.isLoading = false;
      const { data } = request;
      this.developer = data;
    });
  }

  submitFeedback(): void {
    this.submitted = true;
    
    if (this.form.invalid) return;

    const feedback: Feedback = {
      ...this.form.value,
      date: new Date().toISOString(),
    };

    this.recruiterService.addFeedback(this.developer._id!, feedback).subscribe({
      next: (request) => {
        const { data } = request;
        this.developer = data;
        this.form.reset();
        this.submitted = false;
      },
    });
  }

  getSkillsAsString(skills: string | string[]): string {
    return Array.isArray(skills) ? skills.join(', ') : skills;
  }
  
  get f () {
    return this.form.controls;
  }

  getFirstError(controlName: string, viewName: string): string | null {
    const errors = this.f[controlName].errors;
    if (errors) {
      const firstErrorKey = Object.keys(errors)[0] as 'required' | 'minlength' | 'maxlength' | 'email';
      const details = errors[firstErrorKey];
      return this.ds.returnFormError(firstErrorKey, viewName, details);
    }
    return null;
  }
}